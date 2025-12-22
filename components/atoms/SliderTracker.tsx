interface SliderTrackProps {
  minPercentage: number;
  maxPercentage: number;
}

const SliderTrack: React.FC<SliderTrackProps> = ({
  minPercentage,
  maxPercentage,
}) => (
  <div className="relative w-full h-2 bg-gray-200 rounded">
    <div
      className="absolute h-2 bg-green-500 rounded"
      style={{
        left: `${minPercentage}%`,
        width: `${maxPercentage - minPercentage}%`,
      }}
    />
  </div>
);

export default SliderTrack;
