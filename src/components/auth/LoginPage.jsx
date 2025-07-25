import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginRegisterPage = () => {
  const { login, register } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLoginMode) {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "448px" }}>
        {/* Logo + Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              background:
                "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              borderRadius: "16px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              G
            </span>
          </div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "8px",
              margin: "0",
            }}
          >
            GRAVORA
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
              margin: "0",
            }}
          >
            Enterprise GRC, Risk & Compliance Platform
          </p>
        </div>

        {/* Auth Card */}
        <div
          style={{
            background: "rgba(30, 41, 59, 0.6)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            padding: "32px",
            border: "1px solid rgba(71, 85, 105, 0.5)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            {isLoginMode ? "Welcome Back" : "Register New User"}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div style={{ marginBottom: "24px" }}>
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="input"
                />
              </div>
            )}

            <div style={{ marginBottom: "24px" }}>
              <label className="label">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input"
              />
            </div>

            <div style={{ marginBottom: "24px", position: "relative" }}>
              <label className="label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input"
                style={{ paddingRight: "48px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-toggle"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <p style={{ color: "#f87171", marginBottom: "16px" }}>{error}</p>
            )}

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" />
                  {isLoginMode ? "Logging In..." : "Registering..."}
                </>
              ) : isLoginMode ? (
                "Sign In to Gravora GRC"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="auth-toggle">
            {isLoginMode ? "New here?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLoginMode(!isLoginMode)}>
              {isLoginMode ? "Register" : "Login"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              marginBottom: "8px",
              margin: "0 0 8px 0",
            }}
          >
            © 2025 Gravora GRC Solutions. All rights reserved.
          </p>
          <div className="footer-note">
            <span>🔒 Secure</span>
            <span>•</span>
            <span>✅ Compliant</span>
            <span>•</span>
            <span>💼 Professional</span>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .label {
          font-size: 14px;
          font-weight: 500;
          color: #cbd5e1;
          display: block;
          margin-bottom: 8px;
        }
        .input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          background: rgba(51, 65, 85, 0.5);
          border: 1px solid #475569;
          color: white;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          box-sizing: border-box;
        }
        .eye-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
        }
        .submit-btn {
          width: 100%;
          height: 48px;
          background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
          border: none;
          color: white;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        .auth-toggle {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #94a3b8;
        }
        .auth-toggle button {
          color: #93c5fd;
          background: none;
          border: none;
          margin-left: 4px;
          cursor: pointer;
        }
        .footer-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          font-size: 12px;
          color: #475569;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginRegisterPage;
