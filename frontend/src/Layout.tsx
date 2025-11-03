import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { UserType } from '@/types/user';

const Layout = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const canAccessEvents = (userType: UserType) => {
    return ['ORGANIZATION', 'ADMIN'].includes(userType);
  };

  const canAccessItems = (userType: UserType) => {
    return ['VENDOR', 'ADMIN'].includes(userType);
  };

  const canAccessOrganizations = (userType: UserType) => {
    return ['ADMIN'].includes(userType);
  };

  const canAccessVolunteers = (userType: UserType) => {
    return ['ADMIN'].includes(userType);
  };

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
        {user && canAccessEvents(user.user_type) && (
          <Link to="/events" style={{ marginRight: 12 }}>
            Events
          </Link>
        )}
        {user && canAccessItems(user.user_type) && (
          <Link to="/items" style={{ marginRight: 12 }}>
            Items
          </Link>
        )}
        {user && canAccessOrganizations(user.user_type) && (
          <Link to="/organizations" style={{ marginRight: 12 }}>
            Organizations
          </Link>
        )}
        {user && canAccessVolunteers(user.user_type) && (
          <Link to="/volunteers" style={{ marginRight: 12 }}>
            Volunteers
          </Link>
        )}
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
