import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

function Layout() {
  const { auth } = useAuth();

  if (!auth?.accessToken) {
    console.log("no access token, redirecting to login");
    return <Navigate to="/Login" replace />;
  }

  return <Outlet />;
}

export default Layout;
