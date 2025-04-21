"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MultiLayeredTable() {
  const [jsonData, setJSONData] = useState([]);
  const data = [
    {
      iku: "Nilai PDRB Industri Pengolahan	1",
      rows: [
        {
          rencanaAksi: "Rencana Aksi 1",
          indikator: "Indikator 1",
          targets: ["0 Dokumen", "1 Dokumen", "3 Dokumen", "4 Dokumen"],
          pengampu: "Pengampu 1",
          pelaksana: "JAJANG AMIN MANSYUR, S.Kom.",
        },
        {
          rencanaAksi: "Rencana Aksi 2",
          indikator: "Indikator 2",
          targets: ["0 Dokumen", "1 Dokumen", "3 Dokumen", "4 Dokumen"],
          pengampu: "Pengampu 2",
          pelaksana: "JAJANG AMIN MANSYUR, S.Kom.",
        },
        {
          rencanaAksi: "Rencana Aksi 2",
          indikator: "Indikator 2",
          targets: ["0 Dokumen", "1 Dokumen", "3 Dokumen", "4 Dokumen"],
          pengampu: "Pengampu 2",
          pelaksana: "JAJANG AMIN MANSYUR, S.Kom.",
        },
        {
          rencanaAksi: "Rencana Aksi 2",
          indikator: "Indikator 2",
          targets: ["0 Dokumen", "1 Dokumen", "3 Dokumen", "4 Dokumen"],
          pengampu: "Pengampu 2",
          pelaksana: "JAJANG AMIN MANSYUR, S.Kom.",
        },
        {
          rencanaAksi: "Rencana Aksi 2",
          indikator: "Indikator 2",
          targets: ["0 Dokumen", "1 Dokumen", "3 Dokumen", "4 Dokumen"],
          pengampu: "Pengampu 2",
          pelaksana: "JAJANG AMIN MANSYUR, S.Kom.",
        },
        {
          rencanaAksi: "Rencana Aksi 2",
          indikator: "Indikator 2",
          targets: ["0 Dokumen", "1 Dokumen", "3 Dokumen", "4 Dokumen"],
          pengampu: "Pengampu 2",
          pelaksana: "JAJANG AMIN MANSYUR, S.Kom.",
        },
        {
          rencanaAksi: "Rencana Aksi 2",
          indikator: "Indikator 2",
          targets: ["0 Dokumen", "1 Dokumen", "3 Dokumen", "4 Dokumen"],
          pengampu: "Pengampu 2",
          pelaksana: "JAJANG AMIN MANSYUR, S.Kom.",
        },
        {
          rencanaAksi: "Rencana Aksi 2",
          indikator: "Indikator 2",
          targets: ["0 Dokumen", "1 Dokumen", "3 Dokumen", "4 Dokumen"],
          pengampu: "Pengampu 2",
          pelaksana: "JAJANG AMIN MANSYUR, S.Kom.",
        },
        {
          rencanaAksi: "Rencana Aksi 2",
          indikator: "Indikator 2",
          targets: ["0 Dokumen", "1 Dokumen", "3 Dokumen", "4 Dokumen"],
          pengampu: "Pengampu 2",
          pelaksana: "JAJANG AMIN MANSYUR, S.Kom.",
        },
      ],
    },
    {
      iku: "Nilai PDRB Industri Pengolahan	2",
      rows: [
        {
          rencanaAksi: "Rencana Aksi 3",
          indikator: "Indikator 3",
          targets: ["0 Dokumen", "1 Dokumen", "3 Dokumen", "4 Dokumen"],
          pengampu: "Pengampu 3",
          pelaksana: "JAJANG AMIN MANSYUR, S.Kom.",
        },
      ],
    },
  ];
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .post(`${NEXT_PUBLIC_BASE_URL}/api/v1/sakip/rencana-aksi?id_sasaran=292`)
      .then((response) => {
        setJSONData(response?.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      <div className="overflow-x-auto w-full bg-white shadow-md rounded-lg p-4">
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
            {jsonData.map((item, index) =>
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
                  <td className="border border-gray-300 p-2">{row.pengampu}</td>
                  <td className="border border-gray-300 p-2">
                    {row.pelaksana}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
