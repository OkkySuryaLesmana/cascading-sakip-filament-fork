import React, { useRef, useEffect, useState } from "react";

const TreeCardWrapper = ({ children, isVertical }) => {
  const cardRefs = useRef([]);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (!isVertical && cardRefs.current.length > 0) {
      const heights = cardRefs.current.map((ref) => ref?.offsetHeight || 0);
      setMaxHeight(Math.max(...heights));
    }
  }, [children, isVertical]);

  // Assign ref to each card
  const childrenWithRefs = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      forwardedRef: (el) => (cardRefs.current[index] = el),
      dynamicHeight: maxHeight,
    })
  );

  return (
    <div
      className={`relative ${
        isVertical ? "flex flex-col items-center" : "flex gap-6"
      }`}
    >
      {childrenWithRefs}
    </div>
  );
};

export default TreeCardWrapper;
