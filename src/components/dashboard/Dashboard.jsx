import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Shield,
  FileText,
  Users,
  Settings,
  AlertTriangle,
  CheckCircle,
  Menu,
} from 'lucide-react';

import { useAuth } from '../../hooks/useAuth';

import AssetRegistry from '../modules/AssetRegistry';
import RiskRegister from '../modules/RiskRegister';
import ControlLibrary from '../modules/ControlLibrary';
import PolicyManagement from '../modules/PolicyManagement';
import Administration from '../modules/Administration';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, color: '#3b82f6' },
    { id: 'assets', name: 'Asset Registry', icon: Shield, color: '#10b981' },
    { id: 'risks', name: 'Risk Register', icon: AlertTriangle, color: '#f59e0b' },
    { id: 'controls', name: 'Control Library', icon: CheckCircle, color: '#8b5cf6' },
    { id: 'compliance', name: 'Compliance', icon: CheckCircle, color: '#06b6d4' },
    { id: 'audit', name: 'Audit Management', icon: FileText, color: '#ec4899' },
    { id: 'vendor', name: 'Vendor Management', icon: Users, color: '#84cc16' },
    { id: 'incident', name: 'Incident Management', icon: AlertTriangle, color: '#f97316' },
    { id: 'policies', name: 'Policy Management', icon: FileText, color: '#22c55e' },
    { id: 'continuity', name: 'Business Continuity', icon: Shield, color: '#a855f7' },
    { id: 'threat', name: 'Threat Intelligence', icon: AlertTriangle, color: '#0ea5e9' },
    { id: 'admin', name: 'Administration', icon: Settings, color: '#ef4444' }
  ];

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    if (isMobile) setIsMobileMenuOpen(false);
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'assets':
        return <AssetRegistry />;
      case 'risks':
        return <RiskRegister />;
      case 'controls':
        return <ControlLibrary />;
      case 'policies':
        return <PolicyManagement />;
      case 'admin':
        return <Administration />;
      default:
        return <div style={{ padding: '32px', color: '#cbd5e1' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Welcome, {user?.name || user?.email}</h1>
          <p style={{ marginTop: '8px', color: '#94a3b8' }}>
            Use the sidebar to navigate modules.
          </p>
        </div>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      {/* Sidebar */}
      <div style={{
        width: isMobile ? '280px' : '200px',
        background: '#1e293b',
        borderRight: '1px solid #334155',
        position: isMobile ? 'fixed' : 'static',
        left: isMobile && !isMobileMenuOpen ? '-280px' : '0',
        top: 0,
        bottom: 0,
        transition: 'left 0.3s ease',
        zIndex: 1000
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #334155' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white'
          }}>G</div>
          <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginTop: '8px' }}>GRAVORA</div>
        </div>

        <div style={{ padding: '16px 0' }}>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: activeModule === module.id ? module.color : 'transparent',
                  borderLeft: activeModule === module.id ? `4px solid ${module.color}` : '4px solid transparent',
                  color: 'white',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: '500',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} />
                {module.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          height: '60px',
          background: '#1e293b',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px'
        }}>
          <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: '0' }}>
            {modules.find(m => m.id === activeModule)?.name || 'Dashboard'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ color: '#cbd5e1', fontSize: '14px' }}>{user?.email}</div>
            <button
              onClick={logout}
              style={{
                padding: '6px 12px',
                background: '#ef4444',
                borderRadius: '6px',
                fontWeight: '500',
                color: 'white',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Module */}
        <div style={{ flex: 1 }}>{renderModuleContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
