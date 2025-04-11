"use client";
import React, { useRef, useState, useEffect } from "react";
import TreeCard from "./component/treecard";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Minus,
  Plus,
  RefreshCcw,
} from "lucide-react";
import { TreeHeightProvider, useTreeHeight } from "./component/cardWrapper";
import axios from "axios";
import DropdownFilter from "./component/dropdown";
import { useSearchParams, useRouter } from "next/navigation";
import ModalTable from "./component/modalTable";
import html2canvas from "html2canvas";

const renderTreeCard = (
  data,
  level = 1,
  parentIndex = "",
  onCardButtonClick,
  resetKey
) => {
  return data.map((item, index) => {
    const key = `${level}-${parentIndex}${index}`;

    let children = null;
    if (level === 1 && item.sasaran_strategis_pd) {
      children = renderTreeCard(
        item.sasaran_strategis_pd,
        2,
        `${index}-`,
        onCardButtonClick,
        resetKey
      );
    } else if (level === 2 && item.kinerja_program) {
      children = renderTreeCard(
        item.kinerja_program,
        3,
        `${parentIndex}${index}-`,
        onCardButtonClick,
        resetKey
      );
    } else if (level === 3 && item.kinerja_kegiatan) {
      children = renderTreeCard(
        item.kinerja_kegiatan,
        4,
        `${parentIndex}${index}-`,
        onCardButtonClick,
        resetKey
      );
    } else if (level === 4 && item.kinerja_sub_kegiatan) {
      children = renderTreeCard(
        item.kinerja_sub_kegiatan,
        5,
        `${parentIndex}${index}-`,
        onCardButtonClick,
        resetKey
      );
    }

    return (
      <TreeCard
        key={`${key}-${resetKey}`}
        sasaran={item.sasaran}
        indikator={item.indikator}
        pengampu={item.pengampu}
        program={item.program}
        target={item.target}
        realisasi={item.realisasi}
        definisiOperasional={item.definisi_operasional}
        rencanaAksi={item.id}
        rencanaRealisasiAksi={item.rencana_realisasi_aksi}
        handleButtonClick={onCardButtonClick} // <-- pass here
      >
        {children}
      </TreeCard>
    );
  });
};

const OrganizationTree = ({ id, tahun }) => {
  // const searchParams = useSearchParams();
  const router = useRouter();
  const treeContainerRef = useRef(null);
  // const idFromQuery = searchParams.get("id");
  // const yearFromQuery = searchParams.get("year");
  const { resetMaxHeights, maxHeights } = useTreeHeight();
  const [resetKey, setResetKey] = useState(0);

  const containerRef = useRef(null);

  const [jsonData, setJSONData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedSatuanKerja, setSelectedSatuanKerja] = useState("");

  const [selectedSatuanKerjaID, setSelectedSatuanKerjaID] = useState(id || 596);
  const [selectedYear, setSelectedYear] = useState(tahun || "2025");

  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(0.6);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState({ x: 0, y: 0, prevX: 0, prevY: 0 });

  // table

  const [tableJSONData, setTableJSONData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log(maxHeights);
  }, [maxHeights]);
  const getData = () => {
    axios
      .post(
        `https://situ.ciamiskab.go.id/api/v1/sakip/cascading?tahun=${selectedYear}&pd_id=${selectedSatuanKerjaID}`
      )
      .then((response) => {
        resetMaxHeights();
        setResetKey((prev) => prev + 1);
        setJSONData(response?.data);
        setTimeout(() => {
          centerView();
        }, 300);
        // setSatuanKerja(uniqueData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    setSelectedSatuanKerjaID(id ? Number(id) : 596);
    setSelectedYear(tahun || "2025");
  }, [id, tahun]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("id", selectedSatuanKerjaID);
    params.set("year", selectedYear);
    router.push(`?${params.toString()}`, { scroll: false });
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
      prevX: translate.x,
      prevY: translate.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTranslate({
      x: start.prevX + (e.clientX - start.x) / zoom, // Adjust for zoom
      y: start.prevY + (e.clientY - start.y) / zoom, // Adjust for zoom
    });
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleWheel = (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(Math.max(zoom * scaleFactor, 0.2), 2);

    setTranslate({
      x: mouseX - (mouseX - translate.x) * (newZoom / zoom),
      y: mouseY - (mouseY - translate.y) * (newZoom / zoom),
    });

    setZoom(newZoom);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [zoom, translate]);

  const resetZoom = () => {
    setZoom(0.6);
    setTranslate({ x: 0, y: 0 });
  };

  const onCardButtonClick = (id) => {
    console.log(id);
    axios
      .post(
        `https://situ.ciamiskab.go.id/api/v1/sakip/rencana-aksi?id_sasaran=${id}`
      )
      .then((response) => {
        setTableJSONData(response?.data);
        setModalOpen(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const captureAndDownload = async () => {
    if (!treeContainerRef.current) return;

    const transformedNode = treeContainerRef.current.querySelector("div");
    const originalStyle = transformedNode.getAttribute("style");

    transformedNode.style.transform = "none";

    const canvas = await html2canvas(treeContainerRef.current, {
      backgroundColor: "#fff",
      scale: 2,
      useCORS: true,
    });

    transformedNode.setAttribute("style", originalStyle || "");

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/[-:]/g, "")
      .replace("T", "_")
      .slice(0, 15);

    link.href = image;
    link.download = `cascading_${selectedSatuanKerja}_${selectedYear}_${timestamp}.png`;
    link.click();
  };

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
          // <div ref={treeContainerRef}>
          //   <div
          //     className="flex flex-row items-start p-10 w-fit space-x-4"
          //     style={{
          //       transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
          //       transformOrigin: "top left",
          //       transition: "transform 0.1s ease-out",
          //     }}
          //   >
          //     {jsonData.length === 0 ? (
          //       <p className="text-gray-500">No data available</p>
          //     ) : (
          //       jsonData.map((item, index) => (
          //         <div key={index} className="flex flex-col">
          //           {renderTreeCard([item], 1, "", onCardButtonClick)}
          //         </div>
          //       ))
          //     )}
          //   </div>
          // </div>
          <div ref={treeContainerRef} className="w-fit h-fit bg-white p-10">
            <div
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
                transformOrigin: "top left",
                transition: "transform 0.1s ease-out",
              }}
              className="flex flex-row items-start space-x-4"
            >
              {jsonData.length === 0 ? (
                <p className="text-gray-500">No data available</p>
              ) : (
                jsonData.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    {renderTreeCard([item], 1, "", onCardButtonClick, resetKey)}
                  </div>
                ))
              )}
            </div>
          </div>
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
        <button
          onClick={captureAndDownload}
          className="px-2 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded shadow"
        >
          <Download size={16} strokeWidth={3} />
        </button>
        <div className="flex flex-col">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.1, 2))}
            className="px-2 py-2 bg-white text-white rounded-t shadow"
          >
            <Plus color="#666666" size={16} strokeWidth={4} />
          </button>
          <hr style={{ width: "50%" }} />
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.2))}
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
      <ModalTable
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={tableJSONData}
      />
    </div>
  );
};

export default function Page({ searchParams }) {
  const params = React.use(searchParams); // Ensures it's properly unwrapped

  return (
    <TreeHeightProvider>
      <OrganizationTree
        id={params.id ? Number(params.id) : 596}
        tahun={params.tahun || "2025"}
      />
    </TreeHeightProvider>
  );
}
