import pandas as pd
import os
import joblib
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score

from preprocessing import preprocess_data

print(f"📚 Loading data...\n")
df = pd.read_csv('../data/train.csv')

df_clean, encoders = preprocess_data(df, isTraining=True)

features = ['model', 'motor_type', 'wheel', 'color', 'type', 'status', 'motor_volume', 'running_km', 'car_age']
target = 'price'

x = df_clean[features]
y = df_clean[target]

x_train, x_val, y_train, y_val = train_test_split(x, y, test_size=0.2, random_state=42)

print(f"🤖 Training XGBoost model...\n")

param_grid = {
    'n_estimators': [100, 200, 300, 500],
    'learning_rate': [0.01, 0.05, 0.1, 0.2],
    'max_depth': [3, 5, 6, 8, 10],
    'subsample': [0.6, 0.8, 1.0],
    'colsample_bytree': [0.6, 0.8, 1.0],
    'gamma': [0, 0.1, 0.3, 0.5],
    'reg_lambda': [0.5, 1, 1.5, 2],
    'reg_alpha': [0, 0.1, 0.5, 1]
}

random_search = RandomizedSearchCV(
    estimator=XGBRegressor(objective='reg:squarederror', random_state=42),
    param_distributions=param_grid,
    n_iter=30,
    scoring='neg_mean_squared_error',
    cv=5,
    verbose=2,
    random_state=42,
    n_jobs=-1
)

random_search.fit(x_train, y_train)

model = XGBRegressor(
    **random_search.best_params_,
    objective='reg:squarederror',
    random_state=42
)
model.fit(x_train, y_train)

print(f"🎉 Model training complete!\n")

y_pred = model.predict(x_val)
mae = mean_absolute_error(y_val, y_pred)
rmse = root_mean_squared_error(y_val, y_pred)
r2 = r2_score(y_val, y_pred)

print(f"📊 Mean Absolute Error:  {mae:.2f}")
print(f"📉 Root Mean Squared Error: {rmse:.2f}")
print(f"📈 R² Score:   {r2:.4f}\n")

os.makedirs("../models", exist_ok=True)
joblib.dump(model, '../models/xgboost_model.pkl')
joblib.dump(encoders, '../models/encoders.pkl')

print("✅ Model and encoders saved to '/models' successfully!\n")