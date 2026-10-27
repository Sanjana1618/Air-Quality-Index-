from __future__ import annotations

import os
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

try:
    from backend.app.core.config import SUPPORTED_CITY
    from backend.app.services.forecasting import forecast_status, predict_aqi
except ModuleNotFoundError:  # pragma: no cover - runtime compatibility for backend working directory
    from app.core.config import SUPPORTED_CITY
    from app.services.forecasting import forecast_status, predict_aqi

app = FastAPI(
    title="AirCast India",
    description="AQI forecasting platform powered by the existing LSTM artifact and scaler.",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv(
        "AQI_ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ForecastRequest(BaseModel):
    city: str = Field(default=SUPPORTED_CITY, description="City to forecast. The shipped artifact is configured for Delhi.")
    history: list[float] = Field(..., description="Last 30 daily AQI observations used to generate a seven-day forecast.")


@app.get("/health")
def health() -> dict[str, Any]:
    return {"status": "ok", "service": "AirCast India API"}


@app.get("/city-support")
def city_support() -> dict[str, Any]:
    return {
        "supported_cities": [SUPPORTED_CITY],
        "model_note": "The shipped Keras model artifact is configured for a 30-day input sequence and a 7-day forecast horizon.",
        "artifact_paths": {
            "model": "model/aqi_lstm_model.keras",
            "scaler": "model/aqi_scaler.pkl",
        },
    }


@app.get("/model-status")
def model_status() -> dict[str, Any]:
    return forecast_status()


@app.post("/forecast")
def forecast(payload: ForecastRequest) -> dict[str, Any]:
    if len(payload.history) != 30:
        raise HTTPException(status_code=422, detail="AQI history must contain exactly 30 daily observations.")

    try:
        predictions = predict_aqi(payload.history, city=payload.city)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    return {
        "city": payload.city,
        "model": "Delhi LSTM",
        "history_length": len(payload.history),
        "forecast_horizon_days": 7,
        "predictions": predictions,
    }


frontend_dist = Path(__file__).resolve().parents[2] / "frontend" / "dist"
if frontend_dist.is_dir():
    frontend_root = frontend_dist.resolve()
    index_file = frontend_root / "index.html"

    @app.get("/")
    def frontend_home() -> FileResponse:
        return FileResponse(index_file)

    @app.get("/{full_path:path}")
    def frontend_route(full_path: str) -> FileResponse:
        requested_file = (frontend_root / full_path).resolve()
        if requested_file.is_relative_to(frontend_root) and requested_file.is_file():
            return FileResponse(requested_file)
        return FileResponse(index_file)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8123, reload=True)
