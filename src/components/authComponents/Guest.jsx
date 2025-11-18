import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const Guest = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("Guest Component - User:", user);

  if (loading) return <p>Loading...</p>;

  return !user ? children : <Navigate to="/" replace />;
};

export default Guest;
