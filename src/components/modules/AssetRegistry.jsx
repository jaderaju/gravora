import React, { useState } from 'react';
import { Search, Filter, Upload, Download, Plus, Edit, Trash2 } from 'lucide-react';

const AssetRegistry = () => {
  const [assets, setAssets] = useState([
    { id: 1, name: 'Database Server DB-01', category: 'Infrastructure', owner: 'IT Team', criticality: 'Critical', value: 'High', status: 'Active' },
    { id: 2, name: 'Web Application Portal', category: 'Application', owner: 'Dev Team', criticality: 'High', value: 'Medium', status: 'Active' },
    { id: 3, name: 'Customer Data Repository', category: 'Data', owner: 'Data Team', criticality: 'Critical', value: 'High', status: 'Active' },
    { id: 4, name: 'Email Server', category: 'Infrastructure', owner: 'IT Team', criticality: 'Medium', value: 'Low', status: 'Active' },
    { id: 5, name: 'Backup Storage System', category: 'Infrastructure', owner: 'IT Team', criticality: 'High', value: 'Medium', status: 'Active' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [fileInputRef, setFileInputRef] = useState(null);
  const [newAsset, setNewAsset] = useState({
    name: '',
    category: '',
    owner: '',
    criticality: '',
    value: ''
  });

  const handleImport = () => {
    if (fileInputRef) {
      fileInputRef.click();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csvData = e.target.result;
          const lines = csvData.split('\n');
          const headers = lines[0].split(',');
          
          const importedAssets = [];
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
              const values = lines[i].split(',');
              if (values.length >= 5) {
                importedAssets.push({
                  id: assets.length + importedAssets.length + 1,
                  name: values[0]?.trim() || '',
                  category: values[1]?.trim() || '',
                  owner: values[2]?.trim() || '',
                  criticality: values[3]?.trim() || '',
                  value: values[4]?.trim() || '',
                  status: 'Active'
                });
              }
            }
          }
          
          if (importedAssets.length > 0) {
            setAssets([...assets, ...importedAssets]);
            alert(`Successfully imported ${importedAssets.length} assets!`);
          }
        } catch (error) {
          alert('Error importing file. Please ensure it\'s a valid CSV format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAddAsset = () => {
    if (newAsset.name && newAsset.category && newAsset.owner && newAsset.criticality && newAsset.value) {
      const asset = {
        id: assets.length + 1,
        name: newAsset.name,
        category: newAsset.category,
        owner: newAsset.owner,
        criticality: newAsset.criticality,
        value: newAsset.value,
        status: 'Active'
      };
      setAssets([...assets, asset]);
      setNewAsset({ name: '', category: '', owner: '', criticality: '', value: '' });
      setShowAddModal(false);
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
          Asset Registry
        </h1>
        <p style={{ 
          color: '#94a3b8', 
          fontSize: '14px', 
          margin: '0' 
        }}>
          Manage and track all organizational assets
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
          Add Asset
        </button>
        <button 
          onClick={handleImport}
          style={{
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
          }}
        >
          <Upload size={16} />
          Import
        </button>
        <input
          type="file"
          ref={(ref) => setFileInputRef(ref)}
          onChange={handleFileUpload}
          accept=".csv"
          style={{ display: 'none' }}
        />
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
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Total Assets</div>
          <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>5</div>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '8px', padding: '16px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Critical Assets</div>
          <div style={{ color: '#ef4444', fontSize: '24px', fontWeight: 'bold' }}>2</div>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '8px', padding: '16px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>High Value</div>
          <div style={{ color: '#f59e0b', fontSize: '24px', fontWeight: 'bold' }}>2</div>
        </div>
        <div style={{ background: '#1e293b', borderRadius: '8px', padding: '16px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Active</div>
          <div style={{ color: '#10b981', fontSize: '24px', fontWeight: 'bold' }}>5</div>
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
            placeholder="Search assets..."
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
          <option>Infrastructure</option>
          <option>Application</option>
          <option>Data</option>
          <option>Network</option>
          <option>Hardware</option>
        </select>
      </div>

      {/* Assets Table */}
      <div style={{ 
        background: '#1e293b', 
        borderRadius: '8px', 
        border: '1px solid #334155',
        overflow: 'hidden'
      }}>
        {/* Mobile responsive table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#334155' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>ASSET NAME</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>CATEGORY</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>OWNER</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>CRITICALITY</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>VALUE</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>STATUS</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'white', fontSize: '12px', fontWeight: '600' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '12px', color: 'white', fontSize: '14px' }}>{asset.name}</td>
                  <td style={{ padding: '12px', color: '#94a3b8', fontSize: '14px' }}>{asset.category}</td>
                  <td style={{ padding: '12px', color: '#94a3b8', fontSize: '14px' }}>{asset.owner}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: asset.criticality === 'Critical' ? '#ef4444' : asset.criticality === 'High' ? '#f59e0b' : '#10b981',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {asset.criticality}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#94a3b8', fontSize: '14px' }}>{asset.value}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {asset.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer'
                      }}>
                        <Edit size={12} />
                      </button>
                      <button style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer'
                      }}>
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

      {/* Add Asset Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#1e293b',
            borderRadius: '12px',
            padding: '24px',
            width: '100%',
            maxWidth: '500px',
            border: '1px solid #334155'
          }}>
            <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: '0 0 20px 0' }}>
              Add New Asset
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', marginBottom: '6px' }}>
                Asset Name
              </label>
              <input
                type="text"
                value={newAsset.name}
                onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: '#334155',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', marginBottom: '6px' }}>
                Category
              </label>
              <select 
                value={newAsset.category}
                onChange={(e) => setNewAsset({...newAsset, category: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: '#334155',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}>
                <option value="">Select Category</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Application">Application</option>
                <option value="Data">Data</option>
                <option value="Network">Network</option>
                <option value="Hardware">Hardware</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', marginBottom: '6px' }}>
                Owner
              </label>
              <input
                type="text"
                value={newAsset.owner}
                onChange={(e) => setNewAsset({...newAsset, owner: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: '#334155',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', marginBottom: '6px' }}>
                Criticality
              </label>
              <select 
                value={newAsset.criticality}
                onChange={(e) => setNewAsset({...newAsset, criticality: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: '#334155',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}>
                <option value="">Select Criticality</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', marginBottom: '6px' }}>
                Value
              </label>
              <select 
                value={newAsset.value}
                onChange={(e) => setNewAsset({...newAsset, value: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: '#334155',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}>
                <option value="">Select Value</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewAsset({ name: '', category: '', owner: '', criticality: '', value: '' });
                }}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddAsset}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Add Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetRegistry;

