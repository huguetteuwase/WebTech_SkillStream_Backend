import React, { useState } from "react";

const CertificateVerifier = ({ certificates }) => {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    const found = certificates.find(c => c.id === certId.trim());
    setResult(found || "not found");
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Verify Certificate</h2>
      <div className="mb-3">
        <input
          type="text"
          value={certId}
          onChange={e => setCertId(e.target.value)}
          placeholder="Enter Certificate ID"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleVerify}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Verify
      </button>

      {result && (
        <div className="mt-4">
          {result === "not found" ? (
            <p className="text-red-500">Certificate not found.</p>
          ) : (
            <div className="p-3 bg-gray-100 rounded border mt-2">
              <p><strong>ID:</strong> {result.id}</p>
              <p><strong>Course ID:</strong> {result.courseId}</p>
              <p><strong>Issued At:</strong> {new Date(result.issuedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificateVerifier;
