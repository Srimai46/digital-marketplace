import { useEffect, useState } from 'react';
import PageLayout from '../components/Layout/PageLayout';
import { Grid } from '../components/Layout/Grid';
import ProductCard from '../components/Product/ProductCard';
import { getProducts } from '../services/productApi';
import { useAuth } from '../hooks/useAuth';
import ProductForm from '../components/Product/ProductForm';
import { createProduct } from '../services/productApi';
import { useSocket } from '../hooks/useSocket';

export default function ProductListPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useSocket(user?.id, {
    'product:created': (item) => setProducts((prev) => [item, ...prev]),
    'product:updated': (item) => setProducts((prev) => prev.map(p => p.id === item.id ? item : p)),
    'product:deleted': ({ id }) => setProducts((prev) => prev.filter(p => p.id !== id)),
  });

  useEffect(() => {
    getProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout
      header={<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <strong>Digital Marketplace</strong>
        <span>{user ? `Hi, ${user.username}` : 'Guest'}</span>
      </div>}
      sidebar={<div>
        <div style={{ marginBottom: 12 }}>เมนู</div>
        <a href="/">สินค้าทั้งหมด</a><br />
        <a href="/orders">คำสั่งซื้อของฉัน</a><br />
        <a href="/dashboard">แดชบอร์ดผู้ขาย</a>
      </div>}
    >
      {loading ? <div>กำลังโหลด...</div> : (
        <>
          {user?.role === 'SELLER' && (
            <div style={{ marginBottom: 16, padding: 12, border: '1px dashed #ccc' }}>
              <div style={{ marginBottom: 8 }}>เพิ่มสินค้าใหม่</div>
              <ProductForm onSubmit={async (payload) => {
                const created = await createProduct(payload);
                // ไม่ต้อง setProducts เพราะ socket จะ push ให้ทันที
              }} />
            </div>
          )}
          <Grid cols={3}>
            {products.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => window.location.href = `/product/${p.id}`} />
            ))}
          </Grid>
        </>
      )}
    </PageLayout>
  );
}
