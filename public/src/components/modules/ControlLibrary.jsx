import React, { useState } from 'react';
import { Plus, Upload, Download, Search, Edit, Trash2, Sparkles, X } from 'lucide-react';

const ControlLibrary = () => {
  const [controls, setControls] = useState([
    { id: 1, code: 'AC-01', name: 'Access Control Policy', framework: 'NIST', category: 'Access Control', status: 'Implemented', effectiveness: 'Effective' },
    { id: 2, code: 'AC-02', name: 'Account Management', framework: 'NIST', category: 'Access Control', status: 'Implemented', effectiveness: 'Effective' },
    { id: 3, code: 'SC-07', name: 'Boundary Protection', framework: 'NIST', category: 'System Communications', status: 'Partially Implemented', effectiveness: 'Partially Effective' },
    { id: 4, code: 'IA-02', name: 'Identification and Authentication', framework: 'NIST', category: 'Identification', status: 'Implemented', effectiveness: 'Effective' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [editingControl, setEditingControl] = useState(null);
  const [selectedControl, setSelectedControl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('All Frameworks');
  const [newControl, setNewControl] = useState({
    code: '',
    name: '',
    framework: '',
    category: '',
    status: 'Not Implemented',
    effectiveness: 'Not Assessed'
  });

  const handleAddControl = (e) => {
    e.preventDefault();
    if (newControl.code && newControl.name && newControl.framework && newControl.category) {
      const control = {
        id: controls.length + 1,
        ...newControl
      };
      setControls([...controls, control]);
      setNewControl({ code: '', name: '', framework: '', category: '', status: 'Not Implemented', effectiveness: 'Not Assessed' });
      setShowAddModal(false);
    }
  };

  const handleEditControl = (control) => {
    setEditingControl({...control});
    setShowEditModal(true);
  };

  const handleUpdateControl = (e) => {
    e.preventDefault();
    setControls(controls.map(c => c.id === editingControl.id ? editingControl : c));
    setShowEditModal(false);
    setEditingControl(null);
  };

  const handleDeleteControl = (id) => {
    if (window.confirm('Are you sure you want to delete this control?')) {
      setControls(controls.filter(c => c.id !== id));
    }
  };

  const handleStatusClick = (control) => {
    if (control.status === 'Partially Implemented') {
      setSelectedControl(control);
      setShowAIModal(true);
    }
  };

  const handleAIGenerate = () => {
    // Simulate AI policy generation and send to Policy Library
    alert(`AI Assistant generated policy recommendations for ${selectedControl.name} and sent to Policy Library!`);
    setShowAIModal(false);
    setSelectedControl(null);
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
          Control Library
        </h1>
        <p style={{ 
          color: '#94a3b8', 
          fontSize: '14px', 
          margin: '0' 
        }}>
          Manage security controls and compliance frameworks
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
          Add Control
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
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Total Controls</div>
          <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>442</div>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '8px', padding: '16px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Implemented</div>
          <div style={{ color: '#10b981', fontSize: '24px', fontWeight: 'bold' }}>3</div>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '8px', padding: '16px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Effective</div>
          <div style={{ color: '#8b5cf6', fontSize: '24px', fontWeight: 'bold' }}>6</div>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '8px', padding: '16px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Frameworks</div>
          <div style={{ color: '#06b6d4', fontSize: '24px', fontWeight: 'bold' }}>6</div>
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
            placeholder="Search controls..."
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
          value={selectedFramework}
          onChange={(e) => setSelectedFramework(e.target.value)}
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
          <option>All Frameworks</option>
          <option>NIST CSF</option>
          <option>ISO 27001</option>
          <option>QCB/NIA</option>
          <option>GDPR</option>
        </select>
      </div>

      {/* Controls Table */}
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
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>CONTROL CODE</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>CONTROL NAME</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>FRAMEWORK</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>CATEGORY</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>STATUS</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>EFFECTIVENESS</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {controls.map((control) => (
                <tr key={control.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '12px', color: 'white', fontSize: '14px' }}>{control.code}</td>
                  <td style={{ padding: '12px', color: 'white', fontSize: '14px' }}>{control.name}</td>
                  <td style={{ padding: '12px', color: '#94a3b8', fontSize: '14px' }}>{control.framework}</td>
                  <td style={{ padding: '12px', color: '#94a3b8', fontSize: '14px' }}>{control.category}</td>
                  <td style={{ padding: '12px' }}>
                    <span 
                      onClick={() => handleStatusClick(control)}
                      style={{
                        background: control.status === 'Implemented' ? '#10b981' : control.status === 'Partially Implemented' ? '#f59e0b' : '#ef4444',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: control.status === 'Partially Implemented' ? 'pointer' : 'default'
                      }}
                    >
                      {control.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: control.effectiveness === 'Effective' ? '#10b981' : control.effectiveness === 'Partially Effective' ? '#f59e0b' : '#ef4444',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {control.effectiveness}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEditControl(control)}
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
                        onClick={() => handleDeleteControl(control.id)}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Control Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50', padding: '16px' }}>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: '0' }}>Add New Control</h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddControl} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Control Code</label>
                <input
                  type="text"
                  value={newControl.code}
                  onChange={(e) => setNewControl({...newControl, code: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Control Name</label>
                <input
                  type="text"
                  value={newControl.name}
                  onChange={(e) => setNewControl({...newControl, name: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Framework</label>
                  <select
                    value={newControl.framework}
                    onChange={(e) => setNewControl({...newControl, framework: e.target.value})}
                    style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                    required
                  >
                    <option value="">Select Framework</option>
                    <option value="NIST">NIST</option>
                    <option value="ISO 27001">ISO 27001</option>
                    <option value="QCB/NIA">QCB/NIA</option>
                    <option value="GDPR">GDPR</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Category</label>
                  <input
                    type="text"
                    value={newControl.category}
                    onChange={(e) => setNewControl({...newControl, category: e.target.value})}
                    style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                    required
                  />
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
                  Add Control
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Control Modal */}
      {showEditModal && editingControl && (
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50', padding: '16px' }}>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: '0' }}>Edit Control</h3>
              <button
                onClick={() => setShowEditModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateControl} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Control Code</label>
                <input
                  type="text"
                  value={editingControl.code}
                  onChange={(e) => setEditingControl({...editingControl, code: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Control Name</label>
                <input
                  type="text"
                  value={editingControl.name}
                  onChange={(e) => setEditingControl({...editingControl, name: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Status</label>
                  <select
                    value={editingControl.status}
                    onChange={(e) => setEditingControl({...editingControl, status: e.target.value})}
                    style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="Not Implemented">Not Implemented</option>
                    <option value="Partially Implemented">Partially Implemented</option>
                    <option value="Implemented">Implemented</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>Effectiveness</label>
                  <select
                    value={editingControl.effectiveness}
                    onChange={(e) => setEditingControl({...editingControl, effectiveness: e.target.value})}
                    style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', color: 'white', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="Not Assessed">Not Assessed</option>
                    <option value="Ineffective">Ineffective</option>
                    <option value="Partially Effective">Partially Effective</option>
                    <option value="Effective">Effective</option>
                  </select>
                </div>
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
                  Update Control
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      {showAIModal && selectedControl && (
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50', padding: '16px' }}>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '600px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={24} color="#8b5cf6" />
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: '0' }}>AI Policy Assistant</h3>
              </div>
              <button
                onClick={() => setShowAIModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
                Control "{selectedControl.name}" is partially implemented. Our AI assistant can generate policy recommendations to address this gap.
              </p>
              <div style={{ background: '#334155', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Recommended Actions:</h4>
                <ul style={{ color: '#94a3b8', fontSize: '14px', paddingLeft: '20px' }}>
                  <li>Review current implementation status</li>
                  <li>Identify specific gaps in control coverage</li>
                  <li>Generate targeted policy recommendations</li>
                  <li>Create implementation roadmap</li>
                </ul>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowAIModal(false)}
                style={{ flex: '1', padding: '12px', background: '#475569', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAIGenerate}
                style={{ flex: '1', padding: '12px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Sparkles size={16} />
                Generate Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlLibrary;

