import { ArrowRight, Gauge, MapPinned, ShieldAlert, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageShell from '../components/common/PageShell';
import MetricCard from '../components/ui/MetricCard';

const metrics = [
  { label: 'Supported city', value: 'Delhi', detail: 'Configured for the shipped LSTM artifact.' },
  { label: 'Forecast horizon', value: '7 Days', detail: 'Daily AQI roll-forward.' },
  { label: 'Input window', value: '30 Days', detail: 'Sequence-driven historical context.' },
  { label: 'Data guardrail', value: 'Active', detail: 'Artifact validation before inference.' },
];

export default function Home() {
  return (
    <PageShell>
      <main>
        <section className="section-shell grid gap-10 pb-16 pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:pt-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
              <Sparkles size={14} /> Premium air intelligence
            </p>
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Air quality forecasting for <span className="gradient-text">India’s next seven days</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              AirCast India brings together pollution history, model explainability, and daily AQI guidance into a polished web experience rooted in the existing LSTM artifact shipped with this project.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/forecast"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-200"
              >
                View forecast <ArrowRight size={18} />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Current focus</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Delhi AQI signal</h2>
              </div>
              <div className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-200">
                Moderate
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-950/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Now</span>
                  <Gauge className="text-cyan-300" size={18} />
                </div>
                <p className="mt-2 text-4xl font-bold text-white">146</p>
                <p className="mt-2 text-sm text-slate-400">AQI index for the latest daily reading</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4">
                  <p className="text-sm text-slate-300">Forecast confidence</p>
                  <p className="mt-2 text-2xl font-semibold text-white">82%</p>
                </div>
                <div className="rounded-2xl border border-sky-400/20 bg-sky-500/5 p-4">
                  <p className="text-sm text-slate-300">Health signal</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Caution</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell pb-16">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </section>

        <section className="section-shell pb-20">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card-surface p-6">
              <MapPinned className="mb-4 text-cyan-300" size={28} />
              <h3 className="text-xl font-semibold text-white">City-aware intelligence</h3>
              <p className="mt-3 text-slate-300">
                The platform is structured for city-level AQI monitoring with a model footprint that matches the actual trained artifact.
              </p>
            </div>
            <div className="card-surface p-6">
              <Gauge className="mb-4 text-cyan-300" size={28} />
              <h3 className="text-xl font-semibold text-white">Forecast execution</h3>
              <p className="mt-3 text-slate-300">
                A rolling 30-day historical window is transformed and passed to the LSTM to generate a seven-day AQI forecast.
              </p>
            </div>
            <div className="card-surface p-6">
              <ShieldAlert className="mb-4 text-cyan-300" size={28} />
              <h3 className="text-xl font-semibold text-white">Safety-first design</h3>
              <p className="mt-3 text-slate-300">
                Model and scaler validation checks prevent guessing, fabricated outputs, or silent misuse of incompatible artifacts.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
