"use client";

import React, { useRef, useEffect } from "react";

import {
  tooltipArrowStyles,
  tooltipPositionStyles,
} from "@/lib/constants/customStyles";
import { TooltipProps } from "@/types";

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustTooltipPosition = () => {
      if (tooltipRef.current && containerRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Reset styles
        tooltipRef.current.style.left = "";
        tooltipRef.current.style.right = "";
        tooltipRef.current.style.top = "";
        tooltipRef.current.style.bottom = "";
        tooltipRef.current.style.transform = "";

        if (position === "top" || position === "bottom") {
          // Center horizontally
          tooltipRef.current.style.left = "50%";
          tooltipRef.current.style.transform = "translateX(-50%)";

          // Adjust if overflowing horizontally
          if (tooltipRect.right > viewportWidth) {
            tooltipRef.current.style.left = "auto";
            tooltipRef.current.style.right = "0";
            tooltipRef.current.style.transform = "none";
          } else if (tooltipRect.left < 0) {
            tooltipRef.current.style.left = "0";
            tooltipRef.current.style.transform = "none";
          }
        } else {
          // Center vertically for left/right
          tooltipRef.current.style.top = "50%";
          tooltipRef.current.style.transform = "translateY(-50%)";

          // Adjust if overflowing vertically
          if (tooltipRect.bottom > viewportHeight) {
            tooltipRef.current.style.top = "auto";
            tooltipRef.current.style.bottom = "0";
            tooltipRef.current.style.transform = "none";
          } else if (tooltipRect.top < 0) {
            tooltipRef.current.style.top = "0";
            tooltipRef.current.style.transform = "none";
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", adjustTooltipPosition);
      window.addEventListener("resize", adjustTooltipPosition);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", adjustTooltipPosition);
      }
      window.removeEventListener("resize", adjustTooltipPosition);
    };
  }, [position]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {children}
      <div
        ref={tooltipRef}
        className={`absolute z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-black text-white text-sm py-2 px-3 rounded-md whitespace-nowrap ${tooltipPositionStyles[position]}`}
      >
        {content}
        <span
          className={`absolute border-[6px] border-transparent ${tooltipArrowStyles[position]}`}
        ></span>
      </div>
    </div>
  );
};

export default Tooltip;
