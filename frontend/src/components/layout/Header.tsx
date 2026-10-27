import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Forecast', to: '/forecast' },
  { label: 'Cities', to: '/cities' },
  { label: 'Model Insights', to: '/model-insights' },
  { label: 'About', to: '/about' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-300 text-lg font-black text-slate-950">
            A
          </span>
          <div>
            <p className="text-lg font-semibold text-white">AirCast India</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">AQI Forecasting</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/forecast"
          className="rounded-full border border-cyan-400/60 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/20"
        >
          Launch Forecast
        </Link>
      </div>
    </header>
  );
}
