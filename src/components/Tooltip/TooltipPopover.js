import React, { useEffect } from "react";
import debounce from "debounce";
const TooltipPopover = ({ children, coords, updateTooltipCoords }) => {
  const updateCoords = debounce(updateTooltipCoords, 100);
  useEffect(() => {
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, []);

  return (
    <div style={{ ...coords }} className="tooltip-bubble">
      {children}
    </div>
  );
};

export default TooltipPopover;
