export function Grid({ cols = 3, gap = 16, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap }}>
      {children}
    </div>
  );
}
