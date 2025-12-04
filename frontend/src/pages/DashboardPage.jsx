import { useAuth } from '../hooks/useAuth';
import PageLayout from '../components/Layout/PageLayout';

export default function DashboardPage() {
  const { user } = useAuth();

  // Check user role for access permission
  if (user?.role !== 'SELLER' && user?.role !== 'ADMIN') {
    return <div style={{ padding: 24 }}>Permission denied</div>;
  }

  // Render the dashboard content
  return (
    <PageLayout 
      header={<strong>แดชบอร์ดผู้ขาย</strong>} 
      sidebar={<a href="/">หน้าหลัก</a>}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Summary Box */}
        <div style={{ flex: 1, border: '1px solid #eee', padding: 16 }}>
          สรุปยอดขาย
        </div>
        
        {/* Products Box */}
        <div style={{ flex: 1, border: '1px solid #eee', padding: 16 }}>
          สินค้าทั้งหมด
        </div>
      </div>
    </PageLayout>
  );
}