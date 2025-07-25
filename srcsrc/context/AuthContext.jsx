import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("gravora_session"));
    if (session) setUser(session);
  }, []);

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem("gravora_users")) || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid credentials");
    localStorage.setItem("gravora_session", JSON.stringify(found));
    setUser(found);
  };

  const register = async (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("gravora_users")) || [];
    const exists = users.find(u => u.email === email);
    if (exists) throw new Error("Email already registered");
    const newUser = {
      name,
      email,
      password,
      role: users.length === 0 ? "admin" : "user",
      registeredAt: new Date().toISOString()
    };
    const updated = [...users, newUser];
    localStorage.setItem("gravora_users", JSON.stringify(updated));
    localStorage.setItem("gravora_session", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("gravora_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
