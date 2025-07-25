import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #334155",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#ffffff" }}>
        GRAVORA GRC
      </div>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#94a3b8", fontSize: "14px" }}>
            Welcome, {user.name || user.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background:
                "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
