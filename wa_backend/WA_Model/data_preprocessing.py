import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv(r"C:\Users\brayd\Capstone\squat_progress_FINAL.csv")

# Encode the experience level feature
le = LabelEncoder()
df['Experience'] = le.fit_transform(df['Experience'])

# Ensure all weight values are rounded to 5
for i in range(len(df)):
    df.at[i, 'Weight'] = int(round(df.iloc[i]['Weight']/5.0)*5.0)

# Add a volume metric for every new session in the table
df['Volume'] = 0
for i in range(len(df)):
    if i > 0 and i < len(df)-1:
        if (df.iloc[i]['Week'] != df.iloc[i+1]['Week']) | (df.iloc[i]['Session'] != df.iloc[i+1]['Session']):
            volume = (df.iloc[i]['Weight'] * df.iloc[i]['Reps'] + df.iloc[i-1]['Weight'] * df.iloc[i-1]['Reps'] + df.iloc[i-2]['Weight'] * df.iloc[i-2]['Reps'])
            df.at[i, 'Volume'] = volume
i = len(df)-1
df.at[i, 'Volume'] = (df.iloc[i]['Weight'] * df.iloc[i]['Reps'] + df.iloc[i-1]['Weight'] * df.iloc[i-1]['Reps'] + df.iloc[i-2]['Weight'] * df.iloc[i-2]['Reps'])

# Create a copy just in case
original_df = df.copy()

# Creating new dataframe to be used for our tensors (only relevant data)
new_cols = ['UserID', 'Age', 'Bodyweight', 'Experience', 'Session', 'Weight', 'Volume']
tensor_data = pd.DataFrame(columns=new_cols)

for i in range(len(df)-1):
    if df.iloc[i]['Volume'] >= 5:
        session = ((df.iloc[i]['Week'] - 1) * 2) + (df.iloc[i]['Session'])
        tensor_data = tensor_data._append({
            'UserID' : df.iloc[i]['UserID'],
            'Age' : df.iloc[i]['Age'],
            'Bodyweight' : df.iloc[i]['Bodyweight'],
            'Experience' : df.iloc[i]['Experience'],
            'Session' : session,
            'Weight' : df.iloc[i]['Weight'],
            'Volume' : df.iloc[i]['Volume']
        }, ignore_index=True)

print(df.info)