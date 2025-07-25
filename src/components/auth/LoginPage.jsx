import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@gravora.com' && password === 'demo123') {
      onLogin({ 
        email, 
        name: 'Admin User', 
        role: 'Administrator'
      });
    } else {
      alert('Invalid credentials. Please use admin@gravora.com / demo123');
      setIsLoading(false);
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div style={{ width: '100%', maxWidth: '448px' }}>
        {/* Logo Section */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '16px',
              marginBottom: '24px'
            }}
          >
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>G</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '8px', margin: '0' }}>GRAVORA</h1>
          <p style={{ color: '#94a3b8', fontSize: '18px', margin: '0' }}>AI-DRIVEN GRC INTELLIGENCE</p>
        </div>

        {/* Login Card */}
        <div 
          style={{
            background: 'rgba(30, 41, 59, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid rgba(71, 85, 105, 0.5)'
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '32px', textAlign: 'center', margin: '0 0 32px 0' }}>Welcome Back</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gravora.com"
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid #475569',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 48px 0 16px',
                    background: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid #475569',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '48px',
                background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                border: 'none',
                color: 'white',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1,
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isLoading ? (
                <>
                  <div 
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}
                  ></div>
                  Signing In...
                </>
              ) : (
                'Sign In to Gravora GRC'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div 
            style={{
              marginTop: '32px',
              padding: '16px',
              background: 'rgba(51, 65, 85, 0.3)',
              borderRadius: '8px',
              border: '1px solid rgba(71, 85, 105, 0.5)'
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '12px', margin: '0 0 12px 0' }}>Demo Credentials:</h3>
            <div style={{ fontSize: '14px' }}>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>
                Email: <span style={{ color: '#93c5fd' }}>admin@gravora.com</span>
              </div>
              <div style={{ color: '#94a3b8' }}>
                Password: <span style={{ color: '#93c5fd' }}>demo123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px', margin: '0 0 8px 0' }}>© 2025 Gravora GRC Solutions. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', fontSize: '12px', color: '#475569' }}>
            <span>🔒 Secure</span>
            <span>•</span>
            <span>✅ Compliant</span>
            <span>•</span>
            <span>💼 Professional</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;

