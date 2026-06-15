import { useState } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

const ADMIN_PASSWORD = 'terratechadmin2026';

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('tt_admin') === '1');

  const handleLogin = (pw) => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('tt_admin', '1');
      setAuthed(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tt_admin');
    setAuthed(false);
  };

  if (!authed) return <AdminLogin onLogin={handleLogin} />;
  return <AdminDashboard onLogout={handleLogout} />;
}