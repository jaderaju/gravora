import React, { useState } from "react";

const initialPolicies = [
  {
    id: 1,
    title: "Information Security Policy",
    framework: "ISO 27001",
    owner: "CISO",
    classification: "Confidential",
    reviewCycle: "Annually",
    status: "Active",
  },
  {
    id: 2,
    title: "Access Control Policy",
    framework: "NCA ECC",
    owner: "IT Security Lead",
    classification: "Restricted",
    reviewCycle: "Bi-Annually",
    status: "Active",
  },
  {
    id: 3,
    title: "Data Classification Policy",
    framework: "SAMA CSF",
    owner: "Data Protection Officer",
    classification: "Confidential",
    reviewCycle: "Annually",
    status: "Draft",
  }
];

function PolicyManagement() {
  const [policies, setPolicies] = useState(initialPolicies);
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id, updatedPolicy) => {
    setPolicies(policies.map(policy => policy.id === id ? updatedPolicy : policy));
    setEditingId(null);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setPolicies(policies.map(policy => 
      policy.id === id ? { ...policy, [name]: value } : policy
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Policy Management</h1>
      <table className="w-full table-auto border border-gray-200 shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Framework</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Classification</th>
            <th className="p-2">Review Cycle</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id} className="border-t">
              {editingId === policy.id ? (
                <>
                  <td className="p-2">
                    <input name="title" value={policy.title} onChange={(e) => handleChange(e, policy.id)} />
                  </td>
                  <td className="p-2">
                    <input name="framework" value={policy.framework} onChange={(e) => handleChange(e, policy.id)} />
                  </td>
                  <td className="p-2">
                    <input name="owner" value={policy.owner} onChange={(e) => handleChange(e, policy.id)} />
                  </td>
                  <td className="p-2">
                    <input name="classification" value={policy.classification} onChange={(e) => handleChange(e, policy.id)} />
                  </td>
                  <td className="p-2">
                    <input name="reviewCycle" value={policy.reviewCycle} onChange={(e) => handleChange(e, policy.id)} />
                  </td>
                  <td className="p-2">
                    <input name="status" value={policy.status} onChange={(e) => handleChange(e, policy.id)} />
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleSave(policy.id, policy)}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2">{policy.title}</td>
                  <td className="p-2">{policy.framework}</td>
                  <td className="p-2">{policy.owner}</td>
                  <td className="p-2">{policy.classification}</td>
                  <td className="p-2">{policy.reviewCycle}</td>
                  <td className="p-2">{policy.status}</td>
                  <td className="p-2">
                    <button onClick={() => handleEdit(policy.id)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PolicyManagement;
