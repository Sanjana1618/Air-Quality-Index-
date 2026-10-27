import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import PageShell from '../components/common/PageShell';
import { getModelStatus, submitForecast } from '../services/api';

type ModelStatus = {
  status: 'ready' | 'unavailable' | 'disconnected';
  issues: string[];
  message?: string;
};

export default function Forecast() {
  const [history, setHistory] = useState<string[]>(Array.from({ length: 30 }, () => ''));
  const [city, setCity] = useState('Delhi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number[] | null>(null);
  const [modelStatus, setModelStatus] = useState<ModelStatus | null>(null);

  useEffect(() => {
    getModelStatus()
      .then(setModelStatus)
      .catch((err: unknown) => {
        setModelStatus({
          status: 'disconnected',
          issues: [],
          message: err instanceof Error ? err.message : undefined,
        });
      });
  }, []);

  const handleSubmit = async () => {
    const observations = history.map((value) => Number(value));
    if (history.some((value) => value.trim() === '') || observations.some((value) => !Number.isFinite(value))) {
      setError('Enter all 30 actual daily AQI readings before requesting a forecast.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await submitForecast(observations, city);
      setResult(response.predictions);
    } catch (err: unknown) {
      const message = isAxiosError<{ detail?: string }>(err)
        ? err.response?.data?.detail ??
          (err.code === 'ERR_NETWORK'
            ? 'Cannot reach the AQI service. Check that the backend is running and that the API URL is configured correctly.'
            : err.message)
        : err instanceof Error
          ? err.message
          : 'Unable to generate the AQI forecast.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <main className="section-shell py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Forecast</p>
            <h1 className="mt-3 text-3xl font-bold text-white">Seven-day AQI forecast</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
            Input window: 30 days
          </div>
        </div>

        <div
          className={`mb-6 rounded-xl border p-4 text-sm ${
            modelStatus?.status === 'ready'
              ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
              : 'border-amber-400/30 bg-amber-500/10 text-amber-100'
          }`}
        >
          {modelStatus?.status === 'ready'
            ? 'Backend connected. The Delhi LSTM model and scaler are ready.'
            : modelStatus?.status === 'disconnected'
              ? modelStatus.message ??
                'Cannot reach the AQI service. Check that the backend is running and that the API URL is configured correctly.'
              : modelStatus
              ? `Backend connected, but model is unavailable: ${modelStatus.issues.join(' ')}`
              : 'Checking the AQI backend at http://localhost:8123…'}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div className="card-surface p-6">
            <label className="mb-2 block text-sm text-slate-300">City</label>
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none ring-0"
            >
              <option value="Delhi">Delhi</option>
            </select>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                <span>Enter actual daily AQI readings (oldest to newest)</span>
                <span>{history.length} readings</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-5">
                {history.map((value, index) => (
                  <input
                    key={index}
                    type="number"
                    min="0"
                    step="any"
                    aria-label={`AQI reading ${index + 1}`}
                    placeholder={`Day ${index + 1}`}
                    value={value}
                    onChange={(event) => {
                      const nextHistory = [...history];
                      nextHistory[index] = event.target.value;
                      setHistory(nextHistory);
                    }}
                    className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-center text-sm text-white outline-none"
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <><Loader2 className="animate-spin" size={18} /> Running inference</> : <>Generate forecast <ArrowRight size={18} /></>}
            </button>
          </div>

          <div className="card-surface p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Forecast output</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Next 7 days</h2>

            {error ? (
              <div className="mt-6 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-100">
                <div className="mb-2 flex items-center gap-2 font-medium">
                  <AlertTriangle size={16} /> Model warning
                </div>
                <p>{error}</p>
              </div>
            ) : result ? (
              <div className="mt-6 space-y-3">
                {result.map((value, index) => (
                  <div key={index} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-3">
                    <span className="text-slate-300">Day {index + 1}</span>
                    <span className="text-lg font-semibold text-white">{value.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-8 text-center text-slate-400">
                Add 30 actual daily AQI readings, then run the saved Delhi LSTM model.
              </div>
            )}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
