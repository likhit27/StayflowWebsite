import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('sf_admin') === 'true');

  const handleLogout = () => {
    sessionStorage.removeItem('sf_admin');
    setAuthed(false);
  };

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={handleLogout} />;
}
