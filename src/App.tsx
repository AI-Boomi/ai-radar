import React from 'react';
import Header from './components/Header';
import UnifiedView from './components/UnifiedView';
import { useCompanies } from './hooks/useCompanies';

export default function App() {
  const { companies, loading, error } = useCompanies();

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-foreground/80 text-lg">Loading companies…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-red-400">Failed to load: {String(error)}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="px-4 md:px-8">
        <UnifiedView companies={companies} />
      </main>
    </div>
  );
}
