import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

def clean_running_column(df, column_name='running'):
    def convert(val):
        val = val.lower().replace(',', '').strip()
        if 'km' in val:
            return float(val.replace('km', '').strip())
        elif 'miles' in val:
            miles = float(val.replace('miles', '').strip())
            return round(miles * 1.60934, 2)
        return np.nan
    
    df['running_km'] = df[column_name].apply(convert)
    return df

def add_car_age(df, year_col='year', current_year=2025):
    df['car_age'] = current_year - df[year_col].astype(int)
    return df

def encode_categoricals(df, categorical_cols):
    label_encoders = {}

    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        label_encoders[col] = le

    return df, label_encoders

def preprocess_data(df, categorical_cols=None, isTraining=True):
    df = clean_running_column(df)
    df = add_car_age(df)
    
    df['motor_volume'] = pd.to_numeric(df['motor_volume'], errors='coerce')
    # if 'price' in df.columns:
    #     df['price'] = pd.to_numeric(df['price'], errors = 'coerce')

    if categorical_cols is None:
        categorical_cols = ['model', 'motor_type', 'wheel', 'color', 'type', 'status']

    df, encoders = encode_categoricals(df, categorical_cols)

    if isTraining:
        df.dropna(inplace=True)

    return df, encoders
