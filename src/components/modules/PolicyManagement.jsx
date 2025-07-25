import React, { useState } from 'react';
import { Plus, FileText, Sparkles, X } from 'lucide-react';

const PolicyManagement = () => {
  const [policies, setPolicies] = useState([
    { id: 1, name: 'Information Security Policy', type: 'Policy', status: 'Active', version: '2.1', lastReview: '2024-01-15', nextReview: '2025-01-15', owner: 'CISO' },
    { id: 2, name: 'Data Protection Procedure', type: 'Procedure', status: 'Under Review', version: '1.3', lastReview: '2023-12-01', nextReview: '2024-12-01', owner: 'DPO' },
    { id: 3, name: 'Access Control Standard', type: 'Standard', status: 'Active', version: '3.0', lastReview: '2024-02-20', nextReview: '2025-02-20', owner: 'IT Security' }
  ]);

  const [showAIModal, setShowAIModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [aiStep, setAiStep] = useState(1);
  const [aiData, setAiData] = useState({
    policyType: '',
    industry: '',
    compliance: '',
    organization: '',
    requirements: ''
  });

  const policyTypes = ['Information Security Policy', 'Data Protection Policy', 'Access Control Policy', 'Incident Response Policy', 'Business Continuity Policy'];
  const industries = ['Banking & Finance', 'Healthcare', 'Technology', 'Manufacturing', 'Energy & Utilities', 'Government'];
  const complianceFrameworks = ['ISO 27001', 'NIST CSF', 'GDPR', 'HIPAA', 'QCB', 'NIA', 'SOX', 'PCI DSS'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-600';
      case 'Under Review': return 'bg-yellow-600';
      case 'Draft': return 'bg-blue-600';
      case 'Archived': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const handleEditPolicy = (policy) => {
    setEditingPolicy({...policy});
    setShowEditModal(true);
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      setPolicies(policies.filter(p => p.id !== id));
    }
  };

  const handleUpdatePolicy = (e) => {
    e.preventDefault();
    setPolicies(policies.map(p => p.id === editingPolicy.id ? editingPolicy : p));
    setShowEditModal(false);
    setEditingPolicy(null);
  };

  const handleAIGenerate = () => {
    // Simulate AI policy generation
    const newPolicy = {
      id: policies.length + 1,
      name: aiData.policyType,
      type: 'Policy',
      status: 'Draft',
      version: '1.0',
      lastReview: new Date().toISOString().split('T')[0],
      nextReview: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      owner: 'Policy Team'
    };
    setPolicies([...policies, newPolicy]);
    setShowAIModal(false);
    setAiStep(1);
    setAiData({ policyType: '', industry: '', compliance: '', organization: '', requirements: '' });
  };

  const renderAIStep = () => {
    switch (aiStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Step 1: Policy Type</h4>
            <p className="text-slate-400">What type of policy would you like to generate?</p>
            <div className="space-y-2">
              {policyTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setAiData({...aiData, policyType: type})}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    aiData.policyType === type 
                      ? 'border-blue-500 bg-blue-500/20 text-white' 
                      : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:bg-slate-600/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Step 2: Industry</h4>
            <p className="text-slate-400">Select your industry for tailored content:</p>
            <div className="grid grid-cols-2 gap-2">
              {industries.map(industry => (
                <button
                  key={industry}
                  onClick={() => setAiData({...aiData, industry})}
                  className={`p-3 rounded-lg border text-sm transition-colors ${
                    aiData.industry === industry 
                      ? 'border-blue-500 bg-blue-500/20 text-white' 
                      : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:bg-slate-600/30'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Step 3: Compliance Framework</h4>
            <p className="text-slate-400">Which compliance frameworks should be addressed?</p>
            <div className="grid grid-cols-2 gap-2">
              {complianceFrameworks.map(framework => (
                <button
                  key={framework}
                  onClick={() => setAiData({...aiData, compliance: framework})}
                  className={`p-3 rounded-lg border text-sm transition-colors ${
                    aiData.compliance === framework 
                      ? 'border-blue-500 bg-blue-500/20 text-white' 
                      : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:bg-slate-600/30'
                  }`}
                >
                  {framework}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Step 4: Organization Details</h4>
            <p className="text-slate-400">Tell us about your organization:</p>
            <textarea
              value={aiData.organization}
              onChange={(e) => setAiData({...aiData, organization: e.target.value})}
              placeholder="Organization size, structure, key business processes..."
              className="w-full h-24 px-3 py-2 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Step 5: Specific Requirements</h4>
            <p className="text-slate-400">Any specific requirements or focus areas?</p>
            <textarea
              value={aiData.requirements}
              onChange={(e) => setAiData({...aiData, requirements: e.target.value})}
              placeholder="Special requirements, existing policies to reference, specific risks to address..."
              className="w-full h-24 px-3 py-2 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Review & Generate</h4>
            <p className="text-slate-400">Review your selections:</p>
            <div className="space-y-3 bg-slate-700/30 rounded-lg p-4">
              <div><span className="text-slate-400">Policy Type:</span> <span className="text-white">{aiData.policyType}</span></div>
              <div><span className="text-slate-400">Industry:</span> <span className="text-white">{aiData.industry}</span></div>
              <div><span className="text-slate-400">Compliance:</span> <span className="text-white">{aiData.compliance}</span></div>
              <div><span className="text-slate-400">Organization:</span> <span className="text-white">{aiData.organization.substring(0, 50)}...</span></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Policy Management</h1>
          <p className="text-slate-400">Create, manage, and maintain organizational policies</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAIModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg transition-all duration-200"
          >
            <Sparkles className="w-4 h-4" />
            AI Policy Generator
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg transition-all duration-200">
            <Plus className="w-4 h-4" />
            Add Policy
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
          <div className="text-slate-400 text-sm">Total Policies</div>
          <div className="text-2xl font-bold text-white">{policies.length}</div>
        </div>
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
          <div className="text-slate-400 text-sm">Active</div>
          <div className="text-2xl font-bold text-white">{policies.filter(p => p.status === 'Active').length}</div>
        </div>
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
          <div className="text-slate-400 text-sm">Under Review</div>
          <div className="text-2xl font-bold text-white">{policies.filter(p => p.status === 'Under Review').length}</div>
        </div>
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
          <div className="text-slate-400 text-sm">Due for Review</div>
          <div className="text-2xl font-bold text-white">2</div>
        </div>
      </div>

      {/* Policies Table */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Policy Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Last Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Next Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {policies.map((policy) => (
                <tr key={policy.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">{policy.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{policy.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300 font-mono">{policy.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{policy.lastReview}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{policy.nextReview}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{policy.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Policy Generator Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-slate-700/50 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI Policy Generator</h3>
                  <p className="text-slate-400 text-sm">Step {aiStep} of 6</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{width: `${(aiStep / 6) * 100}%`}}
                ></div>
              </div>
            </div>

            {renderAIStep()}

            <div className="flex gap-3 pt-6 border-t border-slate-700/50 mt-6">
              <button
                onClick={() => aiStep > 1 ? setAiStep(aiStep - 1) : setShowAIModal(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                {aiStep > 1 ? 'Previous' : 'Cancel'}
              </button>
              <button
                onClick={() => aiStep < 6 ? setAiStep(aiStep + 1) : handleAIGenerate()}
                disabled={aiStep === 1 && !aiData.policyType || aiStep === 2 && !aiData.industry || aiStep === 3 && !aiData.compliance}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiStep < 6 ? 'Next' : 'Generate Policy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyManagement;

