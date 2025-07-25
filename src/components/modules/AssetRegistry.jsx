// src/components/modules/AssetRegistry.jsx
import React, { useState } from "react";
import Button from "../common/Button";
import { Plus, UploadCloud, DownloadCloud, Edit, Trash2 } from "lucide-react";

const initialAssets = [
  { id: 1, name: "Firewall",   category: "Network",     owner: "IT",      status: "Active"      },
  { id: 2, name: "ERP Server", category: "Application", owner: "Finance", status: "Maintenance" }
];

export default function AssetRegistry() {
  const [assets, setAssets]               = useState(initialAssets);
  const [showModal, setShowModal]         = useState(false);
  const [modalMode, setModalMode]         = useState("add"); // "add" | "edit" | "import"
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [form, setForm]                   = useState({ name: "", category: "", owner: "", status: "Active" });

  const openModal = (mode, asset = null) => {
    setModalMode(mode);
    setSelectedAsset(asset);
    setForm(asset || { name: "", category: "", owner: "", status: "Active" });
    setShowModal(true);
  };

  const saveAsset = () => {
    if (modalMode === "add") {
      setAssets([...assets, { ...form, id: assets.length + 1 }]);
    } else if (modalMode === "edit") {
      setAssets(assets.map(a => a.id === selectedAsset.id ? form : a));
    }
    setShowModal(false);
  };

  const deleteAsset = id => setAssets(assets.filter(a => a.id !== id));
  const exportAssets = () => { console.log("Export:", assets); };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Asset Registry</h1>
        <div className="flex gap-2">
          <Button icon={<Plus size={16}/>} className="bg-blue-600 hover:bg-blue-700" onClick={()=>openModal("add")}>
            Add Asset
          </Button>
          <Button icon={<UploadCloud size={16}/>} className="bg-gray-700 hover:bg-gray-600" onClick={()=>openModal("import")}>
            Import
          </Button>
          <Button icon={<DownloadCloud size={16}/>} className="bg-gray-700 hover:bg-gray-600" onClick={exportAssets}>
            Export
          </Button>
        </div>
      </div>

      <table className="w-full text-left border border-gray-700 rounded overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            {["Name","Category","Owner","Status","Actions"].map(h=>(
              <th key={h} className="p-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assets.map(asset=>(
            <tr key={asset.id} className="border-t border-gray-700">
              <td className="p-2">{asset.name}</td>
              <td className="p-2">{asset.category}</td>
              <td className="p-2">{asset.owner}</td>
              <td className="p-2">{asset.status}</td>
              <td className="p-2 flex gap-2">
                <Button icon={<Edit size={14}/>} className="bg-yellow-600 hover:bg-yellow-700 text-sm" onClick={()=>openModal("edit", asset)}>
                  Edit
                </Button>
                <Button icon={<Trash2 size={14}/>} className="bg-red-600 hover:bg-red-700 text-sm" onClick={()=>deleteAsset(asset.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {modalMode==="add"? "Add Asset": modalMode==="edit"? "Edit Asset": "Import Assets"}
            </h2>

            {modalMode==="import" ? (
              <div className="flex flex-col gap-3">
                <input type="file" accept=".csv,.xlsx" className="p-2 rounded bg-gray-700 text-white"/>
                <div className="flex justify-end gap-2 mt-4">
                  <Button className="bg-gray-600" onClick={()=>setShowModal(false)}>Cancel</Button>
                  <Button className="bg-blue-600" onClick={()=>setShowModal(false)}>Upload</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {["name","category","owner"].map(field=>(
                  <input
                    key={field}
                    placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                    value={form[field]}
                    onChange={e=>setForm({...form,[field]:e.target.value})}
                    className="p-2 rounded bg-gray-700 text-white"
                  />
                ))}
                <select
                  value={form.status}
                  onChange={e=>setForm({...form,status:e.target.value})}
                  className="p-2 rounded bg-gray-700 text-white"
                >
                  {["Active","Inactive","Maintenance"].map(opt=>(
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
                <div className="flex justify-end gap-2 mt-4">
                  <Button className="bg-gray-600" onClick={()=>setShowModal(false)}>Cancel</Button>
                  <Button className="bg-blue-600" onClick={saveAsset}>Save</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
