import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Shield, 
  FileText, 
  Users, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Menu,
  X,
  LogOut
} from 'lucide-react';

// Import all the modules
import AssetRegistry from '../modules/AssetRegistry';
import RiskRegister from '../modules/RiskRegister';
import ControlLibrary from '../modules/ControlLibrary';
import PolicyManagement from '../modules/PolicyManagement';
import Administration from '../modules/Administration';

const Dashboard = ({ user, onLogout }) => {
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
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
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
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <div style={{ padding: isMobile ? '16px' : '24px', background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', minHeight: '100vh' }}>
      {/* Welcome Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', 
        borderRadius: '12px', 
        padding: isMobile ? '16px' : '24px', 
        marginBottom: '24px',
        color: 'white'
      }}>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          Welcome to Gravora GRC Platform
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: isMobile ? '14px' : '16px', margin: '0' }}>
          Your comprehensive solution for enterprise governance, risk management, and compliance tracking.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
        gap: isMobile ? '12px' : '20px', 
        marginBottom: '24px' 
      }}>
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: isMobile ? '16px' : '20px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <Shield size={isMobile ? 20 : 24} color="#10b981" />
            <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>+12</span>
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Total Assets</div>
          <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', color: '#10b981' }}>247</div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: isMobile ? '16px' : '20px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <AlertTriangle size={isMobile ? 20 : 24} color="#ef4444" />
            <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: '600' }}>-3</span>
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Active Risks</div>
          <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', color: '#ef4444' }}>18</div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: isMobile ? '16px' : '20px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <CheckCircle size={isMobile ? 20 : 24} color="#8b5cf6" />
            <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>+25</span>
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Controls</div>
          <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', color: '#8b5cf6' }}>442</div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: isMobile ? '16px' : '20px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <CheckCircle size={isMobile ? 20 : 24} color="#06b6d4" />
            <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>+5%</span>
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Compliance Score</div>
          <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', color: '#06b6d4' }}>87%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
        {/* Recent Risks */}
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '20px', border: '1px solid #334155' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="#ef4444" />
            Recent Risks
          </h3>
          <div>
            <div style={{ padding: '12px 0', borderBottom: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Database Server Compromise</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>Risk Score: 20/25</div>
                </div>
                <span style={{ background: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Critical</span>
              </div>
            </div>
            <div style={{ padding: '12px 0', borderBottom: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Data Backup Failure</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>Risk Score: 15/25</div>
                </div>
                <span style={{ background: '#f59e0b', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>High</span>
              </div>
            </div>
            <div style={{ padding: '12px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Network Security Gap</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>Risk Score: 8/25</div>
                </div>
                <span style={{ background: '#eab308', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Medium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Status */}
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '20px', border: '1px solid #334155' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={20} color="#06b6d4" />
            Compliance Status
          </h3>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'white', fontSize: '14px' }}>QCB Insurance Regulations</span>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>89/125</span>
              </div>
              <div style={{ background: '#334155', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: '#8b5cf6', height: '100%', width: '71%' }}></div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>71% Complete</div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'white', fontSize: '14px' }}>NIA Baseline Controls</span>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>142/167</span>
              </div>
              <div style={{ background: '#334155', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: '#10b981', height: '100%', width: '85%' }}></div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>85% Complete</div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'white', fontSize: '14px' }}>ISO 27001 Standards</span>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>98/114</span>
              </div>
              <div style={{ background: '#334155', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: '#06b6d4', height: '100%', width: '86%' }}></div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>86% Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 999 
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
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
        zIndex: 1000,
        overflowY: 'auto'
      }}>
        {/* Logo */}
        <div style={{ padding: '20px', borderBottom: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            }}>
              G
            </div>
            <div>
              <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>GRAVORA</div>
              <div style={{ color: '#94a3b8', fontSize: '10px' }}>AI-DRIVEN GRC</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: '16px 0' }}>
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: activeModule === module.id ? module.color : 'transparent',
                  border: activeModule === module.id ? `2px solid ${module.color}` : '2px solid transparent',
                  borderLeft: activeModule === module.id ? `4px solid ${module.color}` : '4px solid transparent',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  textAlign: 'left',
                  position: 'relative'
                }}
              >
                <IconComponent size={16} />
                <span>{module.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: isMobile ? '0' : '0' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <Menu size={20} />
              </button>
            )}
            <h2 style={{ color: 'white', fontSize: isMobile ? '18px' : '20px', fontWeight: '600', margin: '0' }}>
              {modules.find(m => m.id === activeModule)?.name || 'Dashboard'}
            </h2>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                A
              </div>
              {!isMobile && (
                <div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Admin User</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>admin@gravora.com</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {renderModuleContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

