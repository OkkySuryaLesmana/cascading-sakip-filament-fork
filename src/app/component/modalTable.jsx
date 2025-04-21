import React, { useState, useMemo } from "react";
import Pagination from "./pagination";

const ModalTable = ({ open, onClose, data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const itemsLimits = [5, 10, 20, 50];

  const flattenedRows = useMemo(() => {
    return data.flatMap((item) =>
      item.rows.map((row) => ({
        ...row,
        iku: item.iku,
        rowSpan: item.rows.length,
      }))
    );
  }, [data]);

  const paginatedRows = useMemo(() => {
    const start = currentPage * rowsPerPage;
    return flattenedRows.slice(start, start + rowsPerPage);
  }, [flattenedRows, currentPage, rowsPerPage]);

  const pages = Math.ceil(flattenedRows.length / rowsPerPage);

  const changePage = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const handleSelectLimit = (limit) => {
    setRowsPerPage(limit);
    setCurrentPage(0); // reset to first page when limit changes
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-10">
      <div className="overflow-x-auto w-full max-h-[95vh] bg-white shadow-md rounded-lg p-4">
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
          {flattenedRows.length > 0 ? (
            <>
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
                  {paginatedRows.map((row, idx) => {
                    const prevRow = paginatedRows[idx - 1];
                    const showIKU = !prevRow || prevRow.iku !== row.iku;
                    const rowCountForIKU = flattenedRows.filter(
                      (r) => r.iku === row.iku
                    ).length;
                    return (
                      <tr key={idx} className="bg-white hover:bg-gray-100">
                        {showIKU && (
                          <td
                            rowSpan={rowCountForIKU}
                            className="border border-gray-300 p-2 font-bold bg-gray-100"
                          >
                            {row.iku}
                          </td>
                        )}
                        <td className="border border-gray-300 p-2">
                          {row.rencanaAksi}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {row.indikator}
                        </td>
                        {row.targets.map((target, i) => (
                          <td key={i} className="border border-gray-300 p-2">
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
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                pages={pages}
                changePage={changePage}
                rowsPerPage={rowsPerPage}
                dataLength={flattenedRows.length}
                itemsLimits={itemsLimits}
                handleSelectLimit={handleSelectLimit}
              />
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalTable;
