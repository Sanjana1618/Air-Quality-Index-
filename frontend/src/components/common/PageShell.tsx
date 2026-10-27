import type { ReactNode } from 'react';
import Header from '../layout/Header';

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      {children}
    </div>
  );
}
