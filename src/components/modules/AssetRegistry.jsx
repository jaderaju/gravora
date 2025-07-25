import React, { useState } from "react";

const initialAssets = [
  { id: 1, name: "Firewall", category: "Network", owner: "IT", status: "Active" },
  { id: 2, name: "ERP Server", category: "Application", owner: "Finance", status: "Maintenance" }
];

function AssetRegistry() {
  const [assets, setAssets] = useState(initialAssets);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // or "edit"
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", owner: "", status: "Active" });

  const openModal = (mode, asset = null) => {
    setModalMode(mode);
    setSelectedAsset(asset);
    if (asset) setForm(asset);
    else setForm({ name: "", category: "", owner: "", status: "Active" });
    setShowModal(true);
  };

  const saveAsset = () => {
    if (modalMode === "add") {
      const newAsset = { ...form, id: assets.length + 1 };
      setAssets([...assets, newAsset]);
    } else {
      const updated = assets.map(a => (a.id === selectedAsset.id ? form : a));
      setAssets(updated);
    }
    setShowModal(false);
  };

  const deleteAsset = (id) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Asset Registry</h1>
        <div className="flex gap-2">
          <button onClick={() => openModal("add")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Add</button>
          <button className="bg-gray-700 px-4 py-2 rounded">Import</button>
          <button className="bg-gray-700 px-4 py-2 rounded">Export</button>
        </div>
      </div>

      <table className="w-full text-left border border-gray-700 rounded overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="border-t border-gray-700">
              <td className="p-2">{asset.name}</td>
              <td className="p-2">{asset.category}</td>
              <td className="p-2">{asset.owner}</td>
              <td className="p-2">{asset.status}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => openModal("edit", asset)} className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 text-sm rounded">Edit</button>
                <button onClick={() => deleteAsset(asset.id)} className="bg-red-600 hover:bg-red-700 px-2 py-1 text-sm rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{modalMode === "add" ? "Add Asset" : "Edit Asset"}</h2>
            <div className="flex flex-col gap-3">
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="p-2 rounded bg-gray-700 text-white" />
              <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="p-2 rounded bg-gray-700 text-white" />
              <input placeholder="Owner" value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className="p-2 rounded bg-gray-700 text-white" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="p-2 rounded bg-gray-700 text-white">
                <option>Active</option>
                <option>Inactive</option>
                <option>Maintenance</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
                <button onClick={saveAsset} className="px-4 py-2 bg-blue-600 rounded">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssetRegistry;
