import React, { useState } from "react";

const initialPolicies = [];

const questions = [
  { key: "framework", label: "Which framework is this policy for (e.g., ISO 27001, NCA)?" },
  { key: "title", label: "What is the policy title?" },
  { key: "purpose", label: "What is the purpose of the policy?" },
  { key: "owner", label: "Who owns this policy?" },
  { key: "reviewCycle", label: "What is the review cycle (e.g., Annually, Bi-Annually)?" },
  { key: "scope", label: "What is the scope or applicability of this policy?" }
];

function PolicyManagement() {
  const [policies, setPolicies] = useState(initialPolicies);
  const [showAssistant, setShowAssistant] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [generatedPolicy, setGeneratedPolicy] = useState("");

  const handleAnswer = (value) => {
    const key = questions[step].key;
    setAnswers({ ...answers, [key]: value });
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      generatePolicy();
      setStep(0);
    }
  };

  const generatePolicy = () => {
    const { framework, title, purpose, owner, reviewCycle, scope } = answers;
    const content = `# ${title}\n
**Framework:** ${framework}\n
**Owner:** ${owner}\n
**Review Cycle:** ${reviewCycle}\n
**Scope:** ${scope}\n\n
## Purpose\n
${purpose}\n\n
## Policy Statement\n
This policy aligns with ${framework} and governs the above scope in accordance with organizational guidelines.`;

    setGeneratedPolicy(content);
  };

  const handleSaveGeneratedPolicy = () => {
    const newPolicy = {
      id: policies.length + 1,
      title: answers.title,
      framework: answers.framework,
      owner: answers.owner,
      classification: "Confidential",
      reviewCycle: answers.reviewCycle,
      status: "Draft",
      body: generatedPolicy
    };
    setPolicies([...policies, newPolicy]);
    setGeneratedPolicy("");
    setAnswers({});
    setShowAssistant(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Policy Management</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setShowAssistant(true)}
      >
        Launch AI Assistant
      </button>

      {showAssistant && (
        <div className="border border-gray-300 p-4 mb-6 bg-white shadow">
          {generatedPolicy ? (
            <>
              <h2 className="text-lg font-semibold mb-2">AI-Generated Policy Draft</h2>
              <textarea
                value={generatedPolicy}
                onChange={(e) => setGeneratedPolicy(e.target.value)}
                className="w-full h-48 border border-gray-200 p-2 mb-4"
              />
              <button
                onClick={handleSaveGeneratedPolicy}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save Policy
              </button>
            </>
          ) : (
            <>
              <p className="mb-2 font-medium">{questions[step].label}</p>
              <input
                className="border p-2 w-full mb-4"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAnswer(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <p className="text-sm text-gray-500">Press Enter to continue</p>
            </>
          )}
        </div>
      )}

      <table className="w-full table-auto border border-gray-200 shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Framework</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Review Cycle</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id} className="border-t">
              <td className="p-2">{policy.title}</td>
              <td className="p-2">{policy.framework}</td>
              <td className="p-2">{policy.owner}</td>
              <td className="p-2">{policy.reviewCycle}</td>
              <td className="p-2">{policy.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PolicyManagement;
