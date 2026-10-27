import PageShell from '../components/common/PageShell';

export default function About() {
  return (
    <PageShell>
      <main className="section-shell py-12">
        <div className="card-surface p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">About</p>
          <h1 className="mt-3 text-3xl font-bold text-white">AirCast India</h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            AirCast India is a premium AQI intelligence platform designed to operationalize the original Delhi-focused LSTM project in a modern web interface. It keeps the original model contract—30-day historical sequence, seven-day forecast horizon, scaler-driven preprocessing, and explicit artifact validation—while making the result accessible through a responsive dashboard and forecast experience.
          </p>
          <p className="mt-4 max-w-3xl text-slate-300">
            The app is intentionally transparent about the real working state of the shipped artifacts: if an artifact is missing, corrupted, or incompatible, the backend fails clearly instead of inventing predictions.
          </p>
        </div>
      </main>
    </PageShell>
  );
}
