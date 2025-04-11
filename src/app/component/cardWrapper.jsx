import React, { createContext, useState, useContext } from "react";

const TreeHeightContext = createContext();

export const TreeHeightProvider = ({ children }) => {
  const [maxHeights, setMaxHeights] = useState({});

  const updateMaxHeight = (level, height) => {
    setMaxHeights((prev) => ({
      ...prev,
      [level]: Math.max(prev[level] || 0, height),
    }));
    // console.log(maxHeights);
  };

  const resetMaxHeights = () => {
    setMaxHeights({});
    console.log("?");
  };

  return (
    <TreeHeightContext.Provider
      value={{ maxHeights, updateMaxHeight, resetMaxHeights }}
    >
      {children}
    </TreeHeightContext.Provider>
  );
};

export const useTreeHeight = () => useContext(TreeHeightContext);
