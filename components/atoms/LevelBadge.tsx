interface LevelBadgeProps {
  level: number;
  className: string;
}

const LevelBadge = ({ level, className }: LevelBadgeProps) => {
  return (
    <p
      className={`bg-primary-green  text-center text-[#FCFEFD] text-sm max-sm:text-xs rounded-md capitalize ${className}`}
    >
      level {level}
    </p>
  );
};

export default LevelBadge;
