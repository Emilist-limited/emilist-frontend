interface SliderHandleProps {
  percentage: number;
  onDragStart: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void;
}

const SliderHandle: React.FC<SliderHandleProps> = ({
  percentage,
  onDragStart,
}) => (
  <div
    className="absolute w-6 h-6 bg-green-500 rounded-full -mt-4 cursor-pointer"
    style={{ left: `calc(${percentage}% - 12px)` }}
    onMouseDown={onDragStart}
    onTouchStart={onDragStart}
  />
);

export default SliderHandle;
