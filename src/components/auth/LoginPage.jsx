import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ✅ Hardcoded login
      if (email === 'admin@gravora.com' && password === 'demo123') {
        toast.success('✅ Login successful');
        onLogin({ email, name: 'Admin User', role: 'Administrator' });
        return;
      }

      // ❌ Invalid credentials
      throw new Error('Invalid email or password');
    } catch (err) {
      toast.error(`❌ ${err.message || 'Login failed'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{ width: '100%', maxWidth: '448px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '16px',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>G</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', margin: 0 }}>GRAVORA</h1>
          <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0 }}>AI-DRIVEN GRC INTELLIGENCE</p>
        </div>

        {/* Auth Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid rgba(71, 85, 105, 0.5)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#cbd5e1', fontSize: '14px', display: 'block', marginBottom: '8px' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gravora.com"
                required
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid #475569',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px', position: 'relative' }}>
              <label style={{ color: '#cbd5e1', fontSize: '14px', display: 'block', marginBottom: '8px' }}>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 48px 0 16px',
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid #475569',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '36px',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
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
                fontSize: '16px',
                marginBottom: '12px'
              }}
            >
              {isLoading ? 'Processing...' : 'Sign In to Gravora GRC'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: '#64748b', fontSize: '14px' }}>© 2025 Gravora GRC Solutions. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
