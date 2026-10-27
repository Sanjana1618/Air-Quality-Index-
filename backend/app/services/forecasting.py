from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Any

import numpy as np

try:
    from backend.app.core.config import MODEL_PATH, SCALER_PATH
except ModuleNotFoundError:  # pragma: no cover - runtime compatibility for backend working directory
    from app.core.config import MODEL_PATH, SCALER_PATH


def _coerce_history(history: list[float] | list[int]) -> np.ndarray:
    values = np.asarray(history, dtype=np.float32)
    if values.size != 30:
        raise ValueError("AQI history must contain exactly 30 daily observations.")
    if not np.isfinite(values).all():
        raise ValueError("AQI history contains NaN or infinite values.")
    return values.reshape(1, 30, 1)


def normalize_prediction_output(raw_predictions: Any) -> np.ndarray:
    array = np.asarray(raw_predictions, dtype=np.float32)
    if array.shape == (1, 7):
        array = array[0]
    if array.shape != (7,):
        raise ValueError(f"Model output must have shape (1, 7) or (7,), got {array.shape}.")
    if not np.isfinite(array).all():
        raise ValueError("Predicted AQI values contain NaN or infinite values.")
    return array


@lru_cache(maxsize=1)
def load_model_and_scaler() -> tuple[Any, Any]:
    model_path = Path(MODEL_PATH)
    scaler_path = Path(SCALER_PATH)

    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found: {model_path}")
    if not scaler_path.exists():
        raise FileNotFoundError(f"Scaler file not found: {scaler_path}")

    try:
        import tensorflow as tf
    except ModuleNotFoundError as exc:
        raise RuntimeError("TensorFlow is not installed in the backend environment. Install tensorflow or tensorflow-macos to run inference.") from exc

    try:
        model = tf.keras.models.load_model(str(model_path))
    except Exception as exc:  # pragma: no cover - runtime artifact validation path
        raise RuntimeError(f"Unable to load the LSTM model from {model_path}: {exc}") from exc

    try:
        import joblib

        scaler = joblib.load(scaler_path)
    except Exception as exc:  # pragma: no cover - runtime artifact validation path
        raise RuntimeError(f"Unable to load the scaler from {scaler_path}. The saved scaler appears to be missing or corrupted: {exc}") from exc

    try:
        _ = scaler.transform
        _ = scaler.inverse_transform
    except AttributeError as exc:
        raise RuntimeError("The saved scaler is not a valid sklearn MinMaxScaler instance required for inverse-transforming AQI values.") from exc

    if getattr(scaler, "n_features_in_", None) != 1:
        raise RuntimeError("The saved scaler must be fitted for exactly one AQI feature.")
    if getattr(model, "input_shape", None) != (None, 30, 1):
        raise RuntimeError(f"The saved model must accept input shape (None, 30, 1); found {getattr(model, 'input_shape', None)}.")
    if getattr(model, "output_shape", None) != (None, 7):
        raise RuntimeError(f"The saved model must return output shape (None, 7); found {getattr(model, 'output_shape', None)}.")

    return model, scaler


def predict_aqi(
    history: list[float] | list[int],
    city: str = "Delhi",
    model_and_scaler: tuple[Any, Any] | None = None,
) -> list[float]:
    if city.lower() != "delhi":
        raise ValueError("This shipped model artifact is configured for Delhi. Use city='Delhi' or update the artifact to a new compatible model.")

    model, scaler = model_and_scaler or load_model_and_scaler()
    prepared = _coerce_history(history).reshape(30, 1)
    scaled_history = scaler.transform(prepared).reshape(1, 30, 1)
    forecast = model.predict(scaled_history, verbose=0)
    normalized = normalize_prediction_output(forecast)
    values = scaler.inverse_transform(normalized.reshape(-1, 1)).reshape(-1).tolist()
    return [round(float(value), 2) for value in values]


def forecast_status() -> dict[str, Any]:
    issues: list[str] = []

    model_path = Path(MODEL_PATH)
    scaler_path = Path(SCALER_PATH)
    if not model_path.exists():
        issues.append(f"Model artifact missing: {model_path}")
    if not scaler_path.exists():
        issues.append(f"Scaler artifact missing: {scaler_path}")

    try:
        load_model_and_scaler()
        return {"status": "ready", "city": "Delhi", "issues": issues}
    except Exception as exc:  # pragma: no cover - runtime validation path
        issues.append(str(exc))
        return {"status": "unavailable", "city": "Delhi", "issues": issues}
