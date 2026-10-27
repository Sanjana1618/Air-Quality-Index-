import PageShell from '../components/common/PageShell';

const cityCards = [
  {
    name: 'Delhi',
    status: 'Operational',
    range: '2024 AQI signal',
    description: 'The shipped model artifact is scoped to Delhi and aligned with the original project logic.',
  },
  {
    name: 'Mumbai',
    status: 'Preview',
    range: 'Available for future expansion',
    description: 'Currently designated as a future integration path if a compatible city-specific model is added.',
  },
  {
    name: 'Bengaluru',
    status: 'Preview',
    range: 'Pending dataset pairing',
    description: 'This city remains reserved for configuration updates once compatible preprocessing artifacts are present.',
  },
];

export default function Cities() {
  return (
    <PageShell>
      <main className="section-shell py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Cities</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Supported AQI coverage</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cityCards.map((city) => (
            <article key={city.name} className="card-surface p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">{city.name}</h2>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${city.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-200' : 'bg-slate-700 text-slate-200'}`}>
                  {city.status}
                </span>
              </div>
              <p className="text-sm text-cyan-200">{city.range}</p>
              <p className="mt-4 text-slate-300">{city.description}</p>
            </article>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
