import { useAuth } from '../hooks/useAuth';
import { login } from '../services/authApi';

export default function LoginPage() {
  const { login: doLogin } = useAuth();

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = await login({ email: fd.get('email'), password: fd.get('password') });
        doLogin(data);
        window.location.href = '/';
      }} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 320 }}>
        <strong>เข้าสู่ระบบ</strong>
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
        <button type="button" onClick={() => { window.location.href = '/register'; }}>Register</button>
      </form>
    </div>
  );
}
