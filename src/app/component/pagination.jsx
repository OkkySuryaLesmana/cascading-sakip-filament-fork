import React from "react";
import { Icon } from "@iconify/react";
import Dropup from "./dropup";

export default function Pagination({
  currentPage = 0,
  pages,
  changePage,
  rowsPerPage,
  dataLength,
  itemsLimits,
  handleSelectLimit,
}) {
  return (
    <div className="py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={(e) => changePage(e, 0)}
          disabled={currentPage === 0}
          className={`relative inline-flex justify-center items-center px-2 py-2 rounded-md ml-3
                    ${
                      currentPage === 0
                        ? "bg-[#F6F6F6] text-[#AAAAAA]"
                        : "bg-[#F5F5FF] text-[#2D2B6C]"
                    }`}
        >
          <Icon icon="mdi:chevron-double-left" />
        </button>
        <button
          onClick={(e) => changePage(e, currentPage - 1)}
          disabled={currentPage === 0}
          className={`relative inline-flex justify-center items-center px-2 py-2 rounded-md ml-3
                    ${
                      currentPage === 0
                        ? "bg-[#F6F6F6] text-[#AAAAAA]"
                        : "bg-[#F5F5FF] text-[#2D2B6C]"
                    }`}
        >
          <Icon icon="mdi:chevron-left" />
        </button>
        {Array.from({ length: pages }, (_, i) => {
          if (
            i === 0 ||
            (currentPage < 3 && i < 4) ||
            (currentPage > 2 && i === currentPage - 1) ||
            currentPage === i ||
            (currentPage < pages - 3 && i === currentPage + 1) ||
            (currentPage > pages - 4 && i > pages - 5) ||
            i === pages - 1
          ) {
            return (
              <button
                key={i}
                onClick={(e) => changePage(e, i)}
                disabled={currentPage === i}
                className={`ml-3 relative inline-flex justify-center items-center px-4 h-8 w-8 text-sm font-medium rounded-md
                                ${
                                  currentPage === i
                                    ? "text-white bg-[#0549CF]"
                                    : "text-[#737373] bg-white hover:bg-gray-50"
                                } `}
              >
                {i + 1}
              </button>
            );
          } else if (
            (currentPage < pages - 3 && i === pages - 2) ||
            (currentPage > 2 && i === 1)
          ) {
            return (
              <span
                key={i}
                className="relative inline-flex justify-center items-center px-4 text-[#737373]"
              >
                <Icon icon="icon-park-outline:more" />
              </span>
            );
          } else {
            return null;
          }
        })}
        <button
          onClick={(e) => changePage(e, currentPage + 1)}
          disabled={currentPage === pages - 1 || dataLength == 0}
          className={`relative inline-flex justify-center items-center px-2 py-2 rounded-md ml-3
                    ${
                      currentPage === pages - 1 || dataLength == 0
                        ? "bg-[#F6F6F6] text-[#AAAAAA]"
                        : "bg-[#F5F5FF] text-[#2D2B6C]"
                    }`}
        >
          <Icon icon="mdi:chevron-right" />
        </button>
        <button
          onClick={(e) => changePage(e, pages - 1)}
          disabled={currentPage === pages - 1 || dataLength == 0}
          className={`relative inline-flex justify-center items-center px-2 py-2 rounded-md ml-3
                    ${
                      currentPage === pages - 1 || dataLength == 0
                        ? "bg-[#F6F6F6] text-[#AAAAAA]"
                        : "bg-[#F5F5FF] text-[#2D2B6C]"
                    }`}
        >
          <Icon icon="mdi:chevron-double-right" />
        </button>
      </div>

      <div className="flex justify-between items-center space-x-2">
        <Dropup
          options={itemsLimits}
          placeholder="Select Catalog (optional)"
          onSelect={handleSelectLimit}
          defaultOpt={itemsLimits[1]}
        />
        <p className="text-sm text-gray-700">
          Displaying{" "}
          <span className="font-medium">{currentPage * rowsPerPage + 1}</span> -{" "}
          <span className="font-medium">
            {(currentPage + 1) * rowsPerPage > dataLength
              ? dataLength
              : (currentPage + 1) * rowsPerPage}
          </span>{" "}
          of <span className="font-medium">{dataLength}</span> records
        </p>
      </div>
    </div>
  );
}
