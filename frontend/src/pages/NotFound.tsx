import { Link } from 'react-router-dom';
import PageShell from '../components/common/PageShell';

export default function NotFound() {
  return (
    <PageShell>
      <main className="section-shell flex min-h-[70vh] items-center justify-center">
        <div className="card-surface p-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">404</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Page not found</h1>
          <p className="mt-3 text-slate-300">The page you are looking for does not exist.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-cyan-300 px-5 py-3 font-medium text-slate-950">
            Return home
          </Link>
        </div>
      </main>
    </PageShell>
  );
}
