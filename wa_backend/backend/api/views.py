from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, WorkoutSerializer, UserProfileSerializer
from .models import Workout, UserProfile
from .ml_model import load_model_and_scalers, predict_next_session
import numpy as np

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class WorkoutListCreate(generics.ListCreateAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user

        # Get the latest workout for this user
        last_workout = Workout.objects.filter(user=user).order_by('-session_number').first()
        next_session_number = (last_workout.session_number + 1) if last_workout else 1

        serializer.save(user=user, session_number=next_session_number)

class WorkoutDeleteView(generics.DestroyAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only allow deleting workouts with all reps and weight = 0
        return Workout.objects.filter(
            user=self.request.user,
            set1_reps=0,
            set2_reps=0,
            set3_reps=0,
            weight=0
        )

    def get_object(self):
        # Retrieve the workout by date (using the 'pk' as the date)
        return get_object_or_404(self.get_queryset(), date=self.kwargs['pk'])

class TestWorkoutList(generics.ListAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(user=self.request.user, weight=0)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Ensure the profile exists for the user
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

# Load model + scalers ONCE when server starts
model, scaler_x, scaler_y = load_model_and_scalers()

class PredictNextWorkoutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # 1. Get latest Workout
        last_workout = Workout.objects.filter(user=user).order_by('-date').first()

        # 2. Get UserProfile
        profile, created = UserProfile.objects.get_or_create(user=user)

        # 3. Prepare input
        features = np.array([[
            profile.age,
            profile.bodyweight,
            profile.experience,
            last_workout.session_number,  # assuming you track session numbers, else make one
            last_workout.weight,
            last_workout.weight * (last_workout.set1_reps + last_workout.set2_reps + last_workout.set3_reps), 
            5,   # Delta_Weight (you can improve this later)
            100    # Delta_Volume (you can improve this later)
        ]])

        # 4. Predict using helper
        next_weight, next_volume = predict_next_session(model, scaler_x, scaler_y, features)

        # 5. Return JSON
        return Response([{
            "date": last_workout.date ,
            "next_weight": 5 * round(next_weight/5),
            "next_volume": 5 * round(next_volume/5),
        }])