import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <>
      <div
        style={{
          padding: 12,
          borderBottom: '1px solid #eee',
          marginBottom: 16,
        }}
      >
        <Link to="/" style={{ marginRight: 12 }}>
          Home
        </Link>
        <Link to="/sierra" style={{ marginRight: 12 }}>
          Sierra
        </Link>
        {isAuthenticated && (
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
