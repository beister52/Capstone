from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Workout, UserProfile

# Serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ["user", "exercise", "session_numer", "set1_reps", "set2_reps", "set3_reps", "weight", "date"]
        read_only_fields = ["id", "date"]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'age', 'bodyweight', 'experience']
        extra_kwargs = { 'user': {'read_only': True}}
        