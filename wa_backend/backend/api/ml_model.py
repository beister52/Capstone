# ml_model.py
import torch
import numpy as np
import joblib
from torch import nn

class WorkoutModel(nn.Module):
    def __init__(self, input_size, output_size):
        super(WorkoutModel, self).__init__()
        self.fc1 = nn.Linear(input_size, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, output_size)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

def load_model_and_scalers():
    # Load model
    input_size = 8
    output_size = 2
    model = WorkoutModel(input_size, output_size)
    model.load_state_dict(torch.load(r'C:\Users\brayd\Capstone\wa_backend\WA_Model\model_trend_based.pth', map_location=torch.device('cpu')))
    model.eval()

    # Load scalers
    scaler_x = joblib.load(r'C:\Users\brayd\Capstone\wa_backend\WA_Model\scaler_x.pkl')
    scaler_y = joblib.load(r'C:\Users\brayd\Capstone\wa_backend\WA_Model\scaler_y.pkl')

    return model, scaler_x, scaler_y

def predict_next_session(model, scaler_x, scaler_y, features_array):
    features_scaled = scaler_x.transform(features_array)
    input_tensor = torch.tensor(features_scaled, dtype=torch.float32)

    with torch.no_grad():
        prediction_scaled = model(input_tensor)
    
    prediction = scaler_y.inverse_transform(prediction_scaled.numpy())

    next_weight, next_volume = prediction[0]
    return next_weight, next_volume
