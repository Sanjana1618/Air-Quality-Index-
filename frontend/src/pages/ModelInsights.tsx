import PageShell from '../components/common/PageShell';

const methodology = [
  'Input window: 30 consecutive daily AQI observations.',
  'Forecast horizon: 7 days, output generated from a trained LSTM sequence model.',
  'Scaling policy: the saved MinMaxScaler transforms the input observations and inverse-transforms the forecast.',
  'Safety rule: inference is blocked when the saved model or scaler artifacts are missing or invalid.',
];

export default function ModelInsights() {
  return (
    <PageShell>
      <main className="section-shell py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Model insights</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Methodology and readiness</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="card-surface p-6">
            <h2 className="text-xl font-semibold text-white">Artifact contract</h2>
            <ul className="mt-5 space-y-4 text-slate-300">
              {methodology.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6">
            <h2 className="text-xl font-semibold text-white">Operational note</h2>
            <p className="mt-4 text-slate-300">
              The saved Keras model and joblib scaler are loaded by the backend and cached for inference. Forecasting is enabled for Delhi only; enter 30 actual daily readings because this workspace does not include historical AQI observations.
            </p>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
