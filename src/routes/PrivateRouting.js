import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PrivateRouting() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (user==null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
}

export default PrivateRouting;
