import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { UserType } from '@/types/user';

const Layout = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const canAccessEvents = (userType: UserType) =>
    ['ORGANIZATION', 'ADMIN'].includes(userType);

  const canAccessItems = (userType: UserType) =>
    ['VENDOR', 'ADMIN'].includes(userType);

  const canAccessOrganizations = (userType: UserType) =>
    ['ADMIN'].includes(userType);

  const canAccessVolunteers = (userType: UserType) => {
    return ['ADMIN'].includes(userType);
  };

  const canAccessAchievements = (userType: UserType) => {
    return ['ADMIN'].includes(userType);
  };

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const linkStyle: React.CSSProperties = {
    padding: '10px 12px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: 'var(--karp-font)',
    fontWeight: 500,
    transition: 'background-color 0.2s',
    fontSize: '14px',
    display: 'block',
  };

  return (
    <>
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderBottom: '1px solid rgba(29, 15, 72, 0.2)',
          minWidth: '1100px',
        }}
      >
        <Link to="/">Home</Link>
        {user && canAccessEvents(user.user_type) && (
          <Link to="/events?status=APPROVED">Events</Link>
        )}

        {user && canAccessItems(user.user_type) && (
          <Link to="/items">Items</Link>
        )}

        {user && canAccessOrganizations(user.user_type) && (
          <Link to="/organizations">Organizations</Link>
        )}

        {user && canAccessVolunteers(user.user_type) && (
          <Link to="/volunteers">Volunteers</Link>
        )}
        {user && canAccessAchievements(user.user_type) && (
          <Link to="/achievements">Achievements</Link>
        )}

        {isAuthenticated && (
          <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <Link
              to="/login"
              onClick={handleLogout}
              style={linkStyle}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor =
                  'rgba(247, 88, 31, 0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </aside>
      {/* spacer to offset fixed header height */}
      <div style={{ height: 48 }} />
      <Outlet />
    </>
  );
};

export default Layout;
