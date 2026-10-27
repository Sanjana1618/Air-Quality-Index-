import { Activity, AlertTriangle, CloudHail, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageShell from '../components/common/PageShell';
import MetricCard from '../components/ui/MetricCard';

const trendData = [
  { day: 'Mon', aqi: 128 },
  { day: 'Tue', aqi: 135 },
  { day: 'Wed', aqi: 141 },
  { day: 'Thu', aqi: 133 },
  { day: 'Fri', aqi: 149 },
  { day: 'Sat', aqi: 159 },
  { day: 'Sun', aqi: 152 },
];

export default function Dashboard() {
  return (
    <PageShell>
      <main className="section-shell py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Air quality overview</h1>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Daily AQI" value="146" detail="Compared with previous week +12.4%" />
          <MetricCard label="City" value="Delhi" detail="Artifact-compatible monitoring" />
          <MetricCard label="Forecast window" value="7 days" detail="Generated from 30-day history" />
          <MetricCard label="Exposure" value="Moderate" detail="Sensitive groups should limit outdoor activity" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.5fr]">
          <div className="card-surface p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Trend</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Seven-day AQI movement</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                <TrendingUp size={16} /> Live history
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="aqiFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#67e8f9" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip />
                  <Area type="monotone" dataKey="aqi" stroke="#67e8f9" fill="url(#aqiFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-surface p-6">
              <div className="mb-4 flex items-center gap-3 text-cyan-200">
                <Activity size={20} />
                <span className="text-sm uppercase tracking-[0.2em]">Status</span>
              </div>
              <p className="text-xl font-semibold text-white">AQI trend improving</p>
              <p className="mt-2 text-sm text-slate-300">
                Air-quality conditions are steady but still above preferred thresholds for sensitive groups.
              </p>
            </div>
            <div className="card-surface p-6">
              <div className="mb-4 flex items-center gap-3 text-amber-200">
                <AlertTriangle size={20} />
                <span className="text-sm uppercase tracking-[0.2em]">Guidance</span>
              </div>
              <p className="text-xl font-semibold text-white">Limit outdoor exertion</p>
              <p className="mt-2 text-sm text-slate-300">
                Reduce strenuous activity for people with asthma, children, and older adults when PM levels rise.
              </p>
            </div>
            <div className="card-surface p-6">
              <div className="mb-4 flex items-center gap-3 text-emerald-200">
                <CloudHail size={20} />
                <span className="text-sm uppercase tracking-[0.2em]">Environment</span>
              </div>
              <p className="text-xl font-semibold text-white">Meteorology</p>
              <p className="mt-2 text-sm text-slate-300">
                Wind speeds are expected to moderate local pollutant accumulation over the next 48 hours.
              </p>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
