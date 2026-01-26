import { Navigate, Outlet } from "react-router";
import Loading from "./Loading";

const ProtectedRoute = () => {
  const user = false;
  const loading = false;

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
