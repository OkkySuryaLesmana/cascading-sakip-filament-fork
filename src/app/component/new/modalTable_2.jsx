import React from "react";

const ModalTable = ({ open, onClose, data }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-10">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden">
        {/* header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Detail</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="p-4">
          {data.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2">Sasaran</th>
                  <th className="border border-gray-300 p-2">Indikator</th>
                  <th className="border border-gray-300 p-2">Klasifikasi</th>
                  <th className="border border-gray-300 p-2">Stakeholder</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">
                      {row.sasaran}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {row.indikator}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {row.klasifikasi}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <ul className="list-disc list-inside">
                        {row.stakeholder.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalTable;
