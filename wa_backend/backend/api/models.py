from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    exercise = models.CharField(max_length=100)
    session_number = models.PositiveIntegerField(default=0 )
    set1_reps = models.PositiveIntegerField()
    set2_reps = models.PositiveIntegerField()
    set3_reps = models.PositiveIntegerField(default=0)
    weight = models.DecimalField(max_digits=5, decimal_places=2)  # e.g., 135.50 lbs
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.exercise} on {self.date}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    age = models.IntegerField(null=True, blank=True)
    bodyweight = models.FloatField(null=True, blank=True)
    experience = models.IntegerField(null=True, blank=True)  # Maybe 0 = beginner, 1 = intermediate, etc.

    def __str__(self):
        return f"{self.user.username}'s Profile"