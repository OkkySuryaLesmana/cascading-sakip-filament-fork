import { useState } from "react";

export default function Dropup({
  onSelect,
  options,
  placeholder = "Dropdown",
  defaultOpt = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOpt);
  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block text-left w-[10]">
      <div>
        <button
          type="button"
          className={`flex items-center justify-between w-full rounded-md shadow-sm p-2 pl-4 pr-4 text-sm text-gray-400 border border-[#e5e7eb] hover:bg-gray-50 focus:outline-none`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-1">
            {selectedOption || placeholder}
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 bottom-full w-full max-h-48 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <div
                key={option}
                className={`block px-4 py-2 text-sm text-gray-700 ${
                  selectedOption === option
                    ? "bg-[#E6F1FF]"
                    : "hover:bg-gray-100"
                } hover:text-gray-900 cursor-pointer	`}
                role="menuitem"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
