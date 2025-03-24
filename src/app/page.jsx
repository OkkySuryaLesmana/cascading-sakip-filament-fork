"use client";
import React, { useRef, useState, useEffect } from "react";
import TreeCard from "./component/treecard";
import jsonData from "./json/data.json";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RefreshCcw,
} from "lucide-react";
import { TreeHeightProvider } from "./component/cardWrapper";
import axios from "axios";
import DropdownFilter from "./component/dropdown";

const renderTreeCard = (data, level = 1, parentIndex = "") => {
  return data.map((item, index) => {
    const key = `${level}-${parentIndex}${index}`;

    let children = null;
    if (level === 1 && item.sasaran_strategis_pd) {
      children = renderTreeCard(item.sasaran_strategis_pd, 2, `${index}-`);
    } else if (level === 2 && item.kinerja_program) {
      children = renderTreeCard(
        item.kinerja_program,
        3,
        `${parentIndex}${index}-`
      );
    } else if (level === 3 && item.kinerja_kegiatan) {
      children = renderTreeCard(
        item.kinerja_kegiatan,
        4,
        `${parentIndex}${index}-`
      );
    } else if (level === 4 && item.kinerja_sub_kegiatan) {
      children = renderTreeCard(
        item.kinerja_sub_kegiatan,
        5,
        `${parentIndex}${index}-`
      );
    }

    return (
      <TreeCard
        key={key}
        sasaran={item.sasaran}
        indikator={item.indikator}
        pengampu={item.pengampu}
        program={item.program}
        target={item.target}
        realisasi={item.realisasi}
        definisiOperasional={item.definisi_operasional}
        rencanaAksi={item.rencana_aksi}
        rencanaRealisasiAksi={item.rencana_realisasi_aksi}
      >
        {children}
      </TreeCard>
    );
  });
};

const OrganizationTree = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [jsonData, setJSONData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedSatuanKerja, setSelectedSatuanKerja] = useState(
    "Dinas Komunikasi dan Informatika Kabupaten Ciamis"
  );
  const [selectedSatuanKerjaID, setSelectedSatuanKerjaID] = useState(598);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [start, setStart] = useState({
    x: 0,
    y: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const [zoom, setZoom] = useState(0.6);
  const getData = () => {
    axios
      .post(
        `https://situ.ciamiskab.go.id/api/v1/sakip/cascading?tahun=${selectedYear}&pd_id=${selectedSatuanKerjaID}`
      )
      .then((response) => {
        console.log(response);
        setJSONData(response?.data);
        setTimeout(() => {
          centerView();
        }, 300);
        // setSatuanKerja(uniqueData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    centerView();
    if (selectedSatuanKerjaID && selectedYear) {
      getData();
    }
  }, [selectedSatuanKerjaID, selectedYear]);

  const centerView = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft =
        (container.scrollWidth - container.clientWidth) / 2;
      container.scrollTop =
        (container.scrollHeight - container.clientHeight) / 4;
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStart({
      x: e.clientX,
      y: e.clientY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX;
    const y = e.clientY;
    const walkX = x - start.x;
    const walkY = y - start.y;
    containerRef.current.scrollLeft = start.scrollLeft - walkX;
    containerRef.current.scrollTop = start.scrollTop - walkY;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 5));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.2));
  const resetZoom = () => setZoom(1);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="h-full w-full overflow-auto cursor-grab active:cursor-grabbing"
      >
        {jsonData.legnth == 0 ? (
          <></>
        ) : (
          <TreeHeightProvider>
            <div
              className="flex flex-row items-start p-10 w-fit  space-x-4"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              {jsonData.map((item, index) => (
                <div key={index} className="flex flex-col">
                  {renderTreeCard([item])}
                </div>
              ))}
            </div>
          </TreeHeightProvider>
        )}
      </div>
      <div>
        <div
          className={`fixed top-5 left-0 z-50 flex flex-col space-y-2 bg-white shadow-lg rounded-r-lg p-2 transition-transform duration-300 ${
            isCollapsed ? "-translate-x-[95%]" : "translate-x-0"
          }`}
        >
          <div className="flex gap-4">
            <DropdownFilter
              selectedSatuanKerja={selectedSatuanKerja}
              setSelectedSatuanKerja={setSelectedSatuanKerja}
              selectedSatuanKerjaID={selectedSatuanKerjaID}
              setSelectedSatuanKerjaID={setSelectedSatuanKerjaID}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 bg-[#0e5da0] text-white rounded-md shadow-lg"
            >
              {!isCollapsed ? <ChevronLeft /> : <ChevronRight />}
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-10 z-50 flex flex-col space-y-2 transform -translate-y-1/2">
        <div className="flex flex-col">
          <button
            onClick={zoomIn}
            className="px-2 py-2 bg-white text-white rounded-t shadow"
          >
            <Plus color="#666666" size={16} strokeWidth={4} />
          </button>
          <hr style={{ width: "50%" }} />
          <button
            onClick={zoomOut}
            className="px-2 py-2 bg-white text-white rounded-b shadow"
          >
            <Minus color="#666666" size={16} strokeWidth={4} />
          </button>
        </div>
        <button
          onClick={resetZoom}
          className="px-2 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
        >
          <RefreshCcw size={16} />
        </button>
      </div>
    </div>
  );
};

export default function Page() {
  return <OrganizationTree jsonData={jsonData} />;
}
