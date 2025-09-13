import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      {/* Optional shared UI */}
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
};

export default Layout;
