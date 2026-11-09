import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Nav />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </div>
  );
}
