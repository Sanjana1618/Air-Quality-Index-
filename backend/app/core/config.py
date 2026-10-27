from pathlib import Path
import os

ROOT_DIR = Path(__file__).resolve().parents[3]
MODEL_DIR = ROOT_DIR / "model"
DEFAULT_MODEL_PATH = MODEL_DIR / "aqi_lstm_model.keras"
DEFAULT_SCALER_PATH = MODEL_DIR / "aqi_scaler.pkl"

MODEL_PATH = Path(os.getenv("AQI_MODEL_PATH", str(DEFAULT_MODEL_PATH)))
SCALER_PATH = Path(os.getenv("AQI_SCALER_PATH", str(DEFAULT_SCALER_PATH)))
SUPPORTED_CITY = os.getenv("AQI_SUPPORTED_CITY", "Delhi")
