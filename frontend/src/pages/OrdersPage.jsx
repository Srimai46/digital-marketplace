import { useEffect, useState } from 'react';
import PageLayout from '../components/Layout/PageLayout';
import { myOrders } from '../services/orderApi';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useSocket(user?.id, {
    'order:created': (order) => setOrders(prev => [order, ...prev]),
    'order:updated': (order) => setOrders(prev => prev.map(o => o.id === order.id ? order : o)),
  });

  useEffect(() => {
    if (!user) return;
    myOrders().then(setOrders);
  }, [user]);

  return (
    <PageLayout header={<strong>คำสั่งซื้อของฉัน</strong>} sidebar={<a href="/">หน้าหลัก</a>}>
      <ul>
        {orders.map(o => (
          <li key={o.id}>{o.orderNumber} — {o.status} — {Number(o.amount)} ฿</li>
        ))}
      </ul>
    </PageLayout>
  );
}
