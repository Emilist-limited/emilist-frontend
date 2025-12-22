import { useEffect, useRef, useState } from "react";
import SliderHandle from "../atoms/SliderHandle";
import SliderTrack from "../atoms/SliderTracker";

interface RangeSliderProps {
  minPrice: number;
  maxPrice: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  minPrice,
  maxPrice,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };
    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);
    return () => window.removeEventListener("resize", updateTrackWidth);
  }, []);

  const getPercentage = (value: number): number => {
    const percentage = ((value - minPrice) / (maxPrice - minPrice)) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  const valueToPercentage = (value: number): number => {
    return ((value - minPrice) / (maxPrice - minPrice)) * trackWidth;
  };

  const percentageToValue = (percentage: number): number => {
    const value = (percentage / trackWidth) * (maxPrice - minPrice) + minPrice;
    return Math.round(Math.max(minPrice, Math.min(maxPrice, value)));
  };

  const handleDrag = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    isMin: boolean
  ) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const constrainedX = Math.max(0, Math.min(trackWidth, offsetX));
      const newValue = percentageToValue(constrainedX);

      if (isMin) {
        onMinChange(Math.min(newValue, maxValue));
      } else {
        onMaxChange(Math.max(newValue, minValue));
      }
    }
  };

  const startDragging = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    isMin: boolean
  ) => {
    handleDrag(e, isMin);
    const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
      handleDrag(moveEvent as any, isMin);
    };
    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
      document.removeEventListener("touchend", upHandler);
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("mouseup", upHandler);
    document.addEventListener("touchend", upHandler);
  };

  return (
    <div className="relative w-full" ref={trackRef}>
      <SliderTrack
        minPercentage={getPercentage(minValue)}
        maxPercentage={getPercentage(maxValue)}
      />
      <SliderHandle
        percentage={getPercentage(minValue)}
        onDragStart={(e) => startDragging(e, true)}
      />
      <SliderHandle
        percentage={getPercentage(maxValue)}
        onDragStart={(e) => startDragging(e, false)}
      />
    </div>
  );
};

export default RangeSlider;
