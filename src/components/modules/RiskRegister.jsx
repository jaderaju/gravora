import React, { useState } from 'react';
import { Plus, Search, Upload, Download, Edit, Trash2, X } from 'lucide-react';

const RiskRegister = () => {
  const [risks, setRisks] = useState([
    { id: 1, title: 'Database Server Compromise', category: 'Cybersecurity', likelihood: 4, impact: 5, score: 20, status: 'Active', owner: 'IT Security' },
    { id: 2, title: 'Data Backup Failure', category: 'Operational', likelihood: 3, impact: 5, score: 15, status: 'Active', owner: 'IT Operations' },
    { id: 3, title: 'Network Security Gap', category: 'Cybersecurity', likelihood: 2, impact: 4, score: 8, status: 'Mitigated', owner: 'Network Team' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [newRisk, setNewRisk] = useState({
    title: '',
    category: '',
    likelihood: 1,
    impact: 1,
    owner: '',
    status: 'Active'
  });

  const categories = ['Cybersecurity', 'Operational', 'Financial', 'Compliance', 'Strategic', 'Reputational'];
  const statuses = ['Active', 'Mitigated', 'Accepted', 'Transferred'];

  const getRiskLevel = (score) => {
    if (score >= 15) return { level: 'Critical', color: '#ef4444' };
    if (score >= 10) return { level: 'High', color: '#f59e0b' };
    if (score >= 5) return { level: 'Medium', color: '#eab308' };
    return { level: 'Low', color: '#10b981' };
  };

  const handleAddRisk = (e) => {
    e.preventDefault();
    if (newRisk.title && newRisk.category && newRisk.owner) {
      const risk = {
        id: risks.length + 1,
        ...newRisk,
        score: newRisk.likelihood * newRisk.impact
      };
      setRisks([...risks, risk]);
      setNewRisk({ title: '', category: '', likelihood: 1, impact: 1, owner: '', status: 'Active' });
      setShowAddModal(false);
    }
  };

  const handleEditRisk = (risk) => {
    setEditingRisk({...risk});
    setShowEditModal(true);
  };

  const handleUpdateRisk = (e) => {
    e.preventDefault();
    const updatedRisk = {
      ...editingRisk,
      score: editingRisk.likelihood * editingRisk.impact
    };
    setRisks(risks.map(r => r.id === editingRisk.id ? updatedRisk : r));
    setShowEditModal(false);
    setEditingRisk(null);
  };

  const handleDeleteRisk = (id) => {
    if (window.confirm('Are you sure you want to delete this risk?')) {
      setRisks(risks.filter(r => r.id !== id));
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', 
      minHeight: '100vh',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: 'white', 
          margin: '0 0 8px 0' 
        }}>
          Risk Register
        </h1>
        <p style={{ 
          color: '#94a3b8', 
          fontSize: '14px', 
          margin: '0' 
        }}>
          Identify, assess, and manage organizational risks
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} />
          Add Risk
        </button>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 16px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <Upload size={16} />
          Import
        </button>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#8b5cf6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 16px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        <div style={{ background: '#1e293b', borderRadius: '8px', padding: '16px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Active Risks</div>
          <div style={{ color: '#ef4444', fontSize: '24px', fontWeight: 'bold' }}>2</div>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '8px', padding: '16px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Critical Risks</div>
          <div style={{ color: '#ef4444', fontSize: '24px', fontWeight: 'bold' }}>2</div>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '8px', padding: '16px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Mitigated</div>
          <div style={{ color: '#10b981', fontSize: '24px', fontWeight: 'bold' }}>1</div>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '8px', padding: '16px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Avg Risk Score</div>
          <div style={{ color: '#f59e0b', fontSize: '24px', fontWeight: 'bold' }}>14.3</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search risks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px 12px',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            outline: 'none',
            minWidth: '150px'
          }}
        >
          <option>All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Risks Table */}
      <div style={{ 
        background: '#1e293b', 
        borderRadius: '8px', 
        border: '1px solid #334155',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#334155' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>RISK TITLE</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>CATEGORY</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>LIKELIHOOD</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>IMPACT</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>SCORE</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>LEVEL</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>OWNER</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>STATUS</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((risk) => {
                const { level, color } = getRiskLevel(risk.score);
                return (
                  <tr key={risk.id} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '12px', color: 'white', fontSize: '14px' }}>{risk.title}</td>
                    <td style={{ padding: '12px', color: '#94a3b8', fontSize: '14px' }}>{risk.category}</td>
                    <td style={{ padding: '12px', color: '#94a3b8', fontSize: '14px' }}>{risk.likelihood}</td>
                    <td style={{ padding: '12px', color: '#94a3b8', fontSize: '14px' }}>{risk.impact}</td>
                    <td style={{ padding: '12px', color: 'white', fontSize: '14px', fontWeight: 'bold' }}>{risk.score}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        background: color,
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {level}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#94a3b8', fontSize: '14px' }}>{risk.owner}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        background: risk.status === 'Active' ? '#ef4444' : '#10b981',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {risk.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEditRisk(risk)}
                          style={{
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteRisk(risk.id)}
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Risk Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50', padding: '16px' }}>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: '0' }}>Add New Risk</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddRisk} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Risk Title</label>
                <input
                  type="text"
                  value={newRisk.title}
                  onChange={(e) => setNewRisk({...newRisk, title: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Category</label>
                  <select
                    value={newRisk.category}
                    onChange={(e) => setNewRisk({...newRisk, category: e.target.value})}
                    style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Owner</label>
                  <input
                    type="text"
                    value={newRisk.owner}
                    onChange={(e) => setNewRisk({...newRisk, owner: e.target.value})}
                    style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                    required
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Likelihood (1-5)</label>
                  <select
                    value={newRisk.likelihood}
                    onChange={(e) => setNewRisk({...newRisk, likelihood: parseInt(e.target.value)})}
                    style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Impact (1-5)</label>
                  <select
                    value={newRisk.impact}
                    onChange={(e) => setNewRisk({...newRisk, impact: parseInt(e.target.value)})}
                    style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: '1', padding: '12px', background: '#475569', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: '1', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}
                >
                  Add Risk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Risk Modal */}
      {showEditModal && editingRisk && (
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50', padding: '16px' }}>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: '0' }}>Edit Risk</h3>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateRisk} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Risk Title</label>
                <input
                  type="text"
                  value={editingRisk.title}
                  onChange={(e) => setEditingRisk({...editingRisk, title: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Likelihood (1-5)</label>
                  <select
                    value={editingRisk.likelihood}
                    onChange={(e) => setEditingRisk({...editingRisk, likelihood: parseInt(e.target.value)})}
                    style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Impact (1-5)</label>
                  <select
                    value={editingRisk.impact}
                    onChange={(e) => setEditingRisk({...editingRisk, impact: parseInt(e.target.value)})}
                    style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Status</label>
                <select
                  value={editingRisk.status}
                  onChange={(e) => setEditingRisk({...editingRisk, status: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  style={{ flex: '1', padding: '12px', background: '#475569', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: '1', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}
                >
                  Update Risk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskRegister;

