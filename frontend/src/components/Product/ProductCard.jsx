export default function ProductCard({ product, onClick }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <strong>{product.title}</strong>
      <span>{product.description || 'No description'}</span>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{Number(product.price)} ฿</span>
        <button onClick={onClick}>ดูรายละเอียด</button>
      </div>
    </div>
  );
}
