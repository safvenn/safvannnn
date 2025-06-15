import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; // ✅ fixed import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      
        const parsed = JSON.parse(storedUser);
        const decoded = jwtDecode(parsed.token)
        console.log("Decoded JWT,decoded"); // ✅ fixed usage
        setUser({
          name: decoded.name,
          email: decoded.email,
          role: parsed.role,
        });
      
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    const decoded = jwtDecode(userData.token); // ✅ fixed usage
    setUser({
      name: decoded.name,
      email: decoded.email,
      role: userData.role,
    });
  };
  const logout =() => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};