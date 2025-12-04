export default function PageLayout({ header, sidebar, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gridTemplateRows: '64px 1fr', height: '100vh' }}>
      <header style={{ gridColumn: '1 / 3', display: 'flex', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid #eee' }}>
        {header}
      </header>
      <aside style={{ borderRight: '1px solid #eee', padding: 16 }}>
        {sidebar}
      </aside>
      <main style={{ padding: 16 }}>
        {children}
      </main>
    </div>
  );
}
