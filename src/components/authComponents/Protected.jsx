import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
// import { useAuth } from "../context/AuthContext";

const Protected = ({ children, route, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if(route) {
    if (!user) return <Navigate to="/login" replace />;
    if (!roles.some(role => role.name === user.role)) return <Navigate to="/" replace />;
  }

  if(!user) return null;

  return children;
};

export default Protected;
