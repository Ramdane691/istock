import { Navigate } from "react-router-dom";

function PrivateRoute({ children, adminOnly = false }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
