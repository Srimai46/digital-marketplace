import { register } from '../services/authApi';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const { login } = useAuth();

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
          username: fd.get('username'),
          email: fd.get('email'),
          password: fd.get('password'),
          role: fd.get('role') || 'BUYER',
        };
        const data = await register(payload);
        login(data);
        window.location.href = '/';
      }} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 320 }}>
        <strong>สมัครสมาชิก</strong>
        <input name="username" placeholder="Username" />
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <select name="role">
          <option value="BUYER">BUYER</option>
          <option value="SELLER">SELLER</option>
        </select>
        <button type="submit">Register</button>
        <button type="button" onClick={() => { window.location.href = '/login'; }}>Login</button>
      </form>
    </div>
  );
}
