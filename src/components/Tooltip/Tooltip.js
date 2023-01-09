import React, { useState } from "react";
import Portal from "./Portal";
import TooltipPopover from "./TooltipPopover";

import data from "/data/glossary.json"; // this is your data file

export default function Tooltip({ children, type, content }) {
  const btnRef = React.createRef();
  const [coords, setCoords] = useState({}); // takes current button coordinates
  const [isOn, setOn] = useState(false); // toggles button visibility
  const [isClicked, setIsClicked] = useState(false); // toggles button visibility

  let timeout, timeout2;

  const updateTooltipCoords = (button) => {
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2, // add half the width of the button for centering
      top: rect.y + window.scrollY, // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });
  };

  const showTip = (e) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2,
      top: rect.y + window.scrollY,
    });

    timeout = setTimeout(() => {
      clearInterval(timeout2);
      setOn(true);
    }, 100);
  };

  const toggleTip = (e) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2,
      top: rect.y + window.scrollY,
    });
    if (isClicked) {
      setOn(!isOn);
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };

  const hideTip = () => {
    if (!isClicked) {
      timeout2 = setTimeout(() => {
        clearInterval(timeout);
        setOn(false);
      }, 500);
    }
  };

  let tooltipContent = data[type].find((item) => item.id === content);
  return (
    <>
      <span
        className="tooltip-link"
        ref={btnRef}
        onMouseEnter={(e) => showTip(e)}
        onMouseLeave={() => hideTip()}
        onClick={(e) => toggleTip(e)}
      >
        {children}
      </span>
      {isOn && (
        <Portal>
          <TooltipPopover
            coords={coords}
            updateTooltipCoords={() =>
              updateTooltipCoords(btnRef.current.buttonNode)
            }
          >
            
            <h4>{children}</h4>

            {/* These properties depend on you JSON structure */}
            {tooltipContent.description}

            {tooltipContent.link && (
              <a href={tooltipContent.link}>
                <br />
                More info
              </a>
            )}
          </TooltipPopover>
        </Portal>
      )}
    </>
  );
}
