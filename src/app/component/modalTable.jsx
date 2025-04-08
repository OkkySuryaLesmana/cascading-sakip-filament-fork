import React from "react";

const ModalTable = ({ open, onClose, data }) => {
  if (!open) return null;
  console.log(data);
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-10">
      <div className="overflow-x-auto w-full bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Rencana Aksi</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {data[0]?.rows.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 text-center">
              <colgroup>
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/8" />
                <col className="w-1/8" />
                <col className="w-1/8" />
                <col className="w-1/8" />
                <col className="w-1/6" />
                <col className="w-1/6" />
              </colgroup>
              <thead>
                <tr className="bg-gray-200">
                  <th rowSpan="2" className="border border-gray-300 p-2">
                    IKU
                  </th>
                  <th rowSpan="2" className="border border-gray-300 p-2">
                    Rencana Aksi
                  </th>
                  <th rowSpan="2" className="border border-gray-300 p-2">
                    Indikator
                  </th>
                  <th colSpan="4" className="border border-gray-300 p-2">
                    Target
                  </th>
                  <th rowSpan="2" className="border border-gray-300 p-2">
                    Pengampu
                  </th>
                  <th rowSpan="2" className="border border-gray-300 p-2">
                    Pelaksana
                  </th>
                </tr>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">TW 1</th>
                  <th className="border border-gray-300 p-2">TW 2</th>
                  <th className="border border-gray-300 p-2">TW 3</th>
                  <th className="border border-gray-300 p-2">TW 4</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) =>
                  item.rows.map((row, rowIndex) => (
                    <tr
                      key={`${index}-${rowIndex}`}
                      className="bg-white hover:bg-gray-100"
                    >
                      {rowIndex === 0 && (
                        <td
                          rowSpan={item.rows.length}
                          className="border border-gray-300 p-2 font-bold bg-gray-100"
                        >
                          {item.iku}
                        </td>
                      )}
                      <td className="border border-gray-300 p-2">
                        {row.rencanaAksi}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.indikator}
                      </td>
                      {row.targets.map((target, tIndex) => (
                        <td key={tIndex} className="border border-gray-300 p-2">
                          {target}
                        </td>
                      ))}
                      <td className="border border-gray-300 p-2">
                        {row.pengampu}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.pelaksana}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalTable;
