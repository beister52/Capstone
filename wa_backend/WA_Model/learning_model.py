import numpy as np
import pandas as pd
import torch
from torch import nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.preprocessing import StandardScaler
import torch.optim as optim
import data_preprocessing

# Load CSV
df = data_preprocessing.tensor_data

# Aggregate by session
session_df = df.groupby(['UserID', 'Session']).agg({
    'Weight': 'mean',
    'Volume': 'sum',
    'Age': 'first',
    'Bodyweight': 'first',
    'Experience': 'first'
}).reset_index()

# Sort and compute deltas
session_df = session_df.sort_values(by=['UserID', 'Session'])
session_df['Delta_Weight'] = session_df.groupby('UserID')['Weight'].diff().fillna(0)
session_df['Delta_Volume'] = session_df.groupby('UserID')['Volume'].diff().fillna(0)

# Compute targets
session_df['Next_Weight'] = session_df.groupby('UserID')['Weight'].shift(-1)
session_df['Next_Volume'] = session_df.groupby('UserID')['Volume'].shift(-1)
session_df = session_df.dropna(subset=['Next_Weight', 'Next_Volume'])

# Features and targets
features = ['Age', 'Bodyweight', 'Experience', 'Session', 'Weight', 'Volume', 'Delta_Weight', 'Delta_Volume']
targets = ['Next_Weight', 'Next_Volume']

x = session_df[features].values
y = session_df[targets].values

# Normalize
scaler_x = StandardScaler()
scaler_y = StandardScaler()

x_scaled = scaler_x.fit_transform(x)
y_scaled = scaler_y.fit_transform(y)

x_tensor = torch.tensor(x_scaled, dtype=torch.float32)
y_tensor = torch.tensor(y_scaled, dtype=torch.float32)

# Dataset and DataLoader
dataset = TensorDataset(x_tensor, y_tensor)
train_loader = DataLoader(dataset, batch_size=32, shuffle=True)

# Model definition
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

# Training setup
input_size = x.shape[1]
output_size = 2
model = WorkoutModel(input_size, output_size)

criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 100
for epoch in range(num_epochs):
    for x_batch, y_batch in train_loader:
        optimizer.zero_grad()
        outputs = model(x_batch)
        loss = criterion(outputs, y_batch)
        loss.backward()
        optimizer.step()
    if epoch % 10 == 0:
        print(f"Epoch {epoch}, Loss: {loss.item():.4f}")

# Save model
torch.save(model.state_dict(), 'model_trend_based.pth')
print("Model saved.")
# NOTE: Everything below will only be run on request
#       User data will be scaled the same way. Our return values must also be integers and match program structure
# Example prediction input

"""
example = np.array([[22, 185, 2, 10, 225, 3375, 5, 100]])  # Replace with real values
example_scaled = scaler_x.transform(example)
input_tensor = torch.tensor(example_scaled, dtype=torch.float32)

model.eval()
with torch.no_grad():
    prediction_scaled = model(input_tensor)
    prediction = scaler_y.inverse_transform(prediction_scaled.numpy())

print("Predicted next session (Weight, Volume):", prediction[0])
"""

import joblib

joblib.dump(scaler_x, 'scaler_x.pkl')
joblib.dump(scaler_y, 'scaler_y.pkl')
