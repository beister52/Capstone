from django.urls import path
from .views import WorkoutListCreate, WorkoutDeleteView, TestWorkoutList, UserProfileView, PredictNextWorkoutView

urlpatterns = [
    path("workouts/", WorkoutListCreate.as_view(), name="workout-list-create"),
    path("workouts/delete/<str:pk>/", WorkoutDeleteView.as_view(), name="workout-delete"),
    path('workouts/test/', TestWorkoutList.as_view(), name='test-workout-list'),
    path('profile/', UserProfileView.as_view(), name='user-profile') ,
    path('predictworkouts/', PredictNextWorkoutView.as_view(), name='predict-next-workout'),
]