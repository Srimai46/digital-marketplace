import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import { getProduct } from '../services/productApi';
import { listReviews, addReview } from '../services/reviewApi';
import { useAuth } from '../hooks/useAuth';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const p = await getProduct(id);
        const r = await listReviews(id);
        setProduct(p);
        setReviews(r);
      } catch (err) {
        alert('โหลดข้อมูลไม่สำเร็จ');
      }
    };
    load();
  }, [id]);

  return (
    <PageLayout header={<strong>รายละเอียดสินค้า</strong>} sidebar={<a href="/">ย้อนกลับ</a>}>
      {!product ? (
        <div>กำลังโหลด...</div>
      ) : (
        <div style={{ display: 'flex', gap: 24 }}>
          {/* ================= LEFT ================= */}
          <div style={{ flex: 1 }}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>ราคา: {Number(product.price)} ฿</p>
            <a href={product.fileUrl} target="_blank" rel="noreferrer">
              ดูไฟล์/ตัวอย่าง
            </a>
          </div>

          {/* ================= RIGHT ================= */}
          <div style={{ flex: 1 }}>
            <h3>รีวิว</h3>

            <ul>
              {reviews.length === 0 && <li>ยังไม่มีรีวิว</li>}
              {reviews.map((r) => (
                <li key={r.id}>
                  {r.reviewer?.username || 'ผู้ใช้ไม่ทราบชื่อ'} : {r.rating}/5 —{' '}
                  {r.comment || '-'}
                </li>
              ))}
            </ul>

            {/* ================= ADD REVIEW ================= */}
            {user?.role === 'BUYER' && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const form = e.currentTarget;
                  if (!form) return;

                  const fd = new FormData(form);
                  const payload = {
                    productId: id,
                    rating: Number(fd.get('rating')),
                    comment: fd.get('comment'),
                  };

                  try {
                    setLoading(true);

                    const created = await addReview(payload);
                    setReviews((prev) => [created, ...prev]);

                    form.reset();
                  } catch (err) {
                    alert(err.response?.data?.message || 'ไม่สามารถส่งรีวิวได้');
                  } finally {
                    setLoading(false);
                  }
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}
              >
                <input
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  placeholder="คะแนน 1–5"
                  required
                />
                <input name="comment" placeholder="ความคิดเห็น" />
                <button type="submit" disabled={loading}>
                  {loading ? 'กำลังส่ง...' : 'ส่งรีวิว'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
