import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Dropdown = ({
  label,
  options,
  selected,
  setSelected,
  placeholder = "",
  width = "w-64",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setSearchTerm("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <h4 className="text-[14px] font-semibold text-[#1E1E1E] mb-[1px]">
        {label}
      </h4>
      <div className={`relative inline-block text-left ${width}`}>
        <button
          type="button"
          className="flex items-center justify-between w-full rounded-md shadow-sm p-[9px] pl-4 pr-4 text-sm text-gray-400 border border-[#e5e7eb] bg-white hover:bg-gray-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-1 text-[#1E1E1E]">
            {selected || placeholder}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 -mr-1 h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "m6 15l6-6l6 6" : "m6 9l6 6l6-6"}
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="p-3">
              <input
                className="px-2 py-2 border border-[#e5e7eb] focus:outline-none focus:border-blue-500 rounded-md flex-1 text-sm w-full"
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ maxHeight: "215px", overflowY: "auto" }}>
              {options
                .filter((opt) =>
                  opt.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((option) => (
                  <div
                    key={option.id || option.name}
                    className={`flex justify-between items-center px-4 py-2 text-sm text-gray-700 cursor-pointer ${
                      selected === option.name
                        ? "bg-[#E6F1FF]"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelect(option.name)}
                  >
                    <span className="truncate">{option.name}</span>
                    {selected === option.name && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
                        />
                      </svg>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DropdownFilter = ({
  selectedYear,
  setSelectedYear,
  selectedPengampu,
  setSelectedPengampu,
  selectedSasaran,
  setSelectedSasaran,
}) => {
  const [options, setOptions] = useState({
    tahun: [],
    pengampu: [],
    sasaran: [],
  });

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/sakip/pohon-kinerja/list-filter`
      )
      .then((res) => {
        const tahunOptions = res.data.tahun.map((t) => ({ name: String(t) }));
        const pengampuOptions = res.data.pengampu.map((p) => ({ name: p }));
        const sasaranOptions = res.data.sasaran.map((s) => ({ name: s }));

        setOptions({
          tahun: tahunOptions,
          pengampu: pengampuOptions,
          sasaran: sasaranOptions,
        });

        if (tahunOptions.length > 0) setSelectedYear(tahunOptions[0].name);
        if (pengampuOptions.length > 0)
          setSelectedPengampu(pengampuOptions[0].name);
        if (sasaranOptions.length > 0)
          setSelectedSasaran(sasaranOptions[0].name);
      })
      .catch((err) => console.error("Failed to fetch dropdown options:", err));
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      <Dropdown
        label="Tahun"
        placeholder="Pilih Tahun"
        options={options.tahun}
        selected={selectedYear}
        setSelected={setSelectedYear}
      />
      <Dropdown
        label="Pengampu"
        placeholder="Pilih Pengampu"
        options={options.pengampu}
        selected={selectedPengampu}
        setSelected={setSelectedPengampu}
        width="w-[400px]"
      />
      <Dropdown
        label="Sasaran"
        placeholder="Pilih Sasaran"
        options={options.sasaran}
        selected={selectedSasaran}
        setSelected={setSelectedSasaran}
        width="w-[600px]"
      />
    </div>
  );
};

export default DropdownFilter;
