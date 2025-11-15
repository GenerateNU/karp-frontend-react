import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { UserType } from '@/types/user';

const SIDEBAR_WIDTH = 'clamp(180px, 10vw, 200px)';

const Layout = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const canAccessEvents = (userType: UserType) =>
    ['ORGANIZATION', 'ADMIN'].includes(userType);

  const canAccessItems = (userType: UserType) =>
    ['VENDOR', 'ADMIN'].includes(userType);

  const canAccessOrganizations = (userType: UserType) =>
    ['ADMIN'].includes(userType);

  const canAccessVolunteers = (userType: UserType) =>
    ['ADMIN'].includes(userType);

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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: SIDEBAR_WIDTH,
          padding: '20px 12px',
          borderRight: '1px solid rgba(29, 15, 72, 0.2)',
          backgroundColor: 'var(--karp-background)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 1000,
          boxSizing: 'border-box',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Link
          to="/"
          style={linkStyle}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(52, 165, 228, 0.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Home
        </Link>

        {user && canAccessEvents(user.user_type) && (
          <Link
            to="/events"
            style={linkStyle}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(52, 165, 228, 0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Events
          </Link>
        )}

        {user && canAccessItems(user.user_type) && (
          <Link
            to="/items"
            style={linkStyle}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(52, 165, 228, 0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Items
          </Link>
        )}

        {user && canAccessOrganizations(user.user_type) && (
          <Link
            to="/organizations"
            style={linkStyle}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(52, 165, 228, 0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Organizations
          </Link>
        )}

        {user && canAccessVolunteers(user.user_type) && (
          <Link
            to="/volunteers"
            style={linkStyle}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(52, 165, 228, 0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Volunteers
          </Link>
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

      <main
        style={{
          marginLeft: SIDEBAR_WIDTH,
          flex: 1,
          padding: '24px',
          minWidth: 0,
          maxWidth: '1100px', // page width smaller
          width: '100%',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
