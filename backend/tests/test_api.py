from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.services.forecasting import normalize_prediction_output

client = TestClient(app)


def test_invalid_history_length_is_rejected():
    response = client.post(
        "/forecast",
        json={"city": "Delhi", "history": [30.0] * 29},
    )
    assert response.status_code == 422


def test_model_output_shape_is_normalized():
    predictions = normalize_prediction_output([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0])
    assert predictions.shape == (7,)


def test_model_status_endpoint_responds():
    response = client.get("/model-status")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ready"
    assert payload["issues"] == []


def test_frontend_and_client_route_are_served_by_fastapi():
    home = client.get("/")
    forecast_page = client.get("/forecast")

    assert home.status_code == 200
    assert forecast_page.status_code == 200
    assert '<div id="root"></div>' in home.text
    assert '<div id="root"></div>' in forecast_page.text


def test_forecast_runs_the_saved_model():
    response = client.post(
        "/forecast",
        json={"city": "Delhi", "history": [100.0 + index for index in range(30)]},
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["model"] == "Delhi LSTM"
    assert payload["forecast_horizon_days"] == 7
    assert len(payload["predictions"]) == 7
    assert all(isinstance(value, float) for value in payload["predictions"])
