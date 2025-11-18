import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi, logout as logoutApi, getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);
 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // First-time loading

  // Load user on refresh
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getCurrentUser();
        setUser(data); // data contains { id, name, email, role }
        console.log("Fetched user:", data);
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    setUser(data.user); 
    return data;
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
