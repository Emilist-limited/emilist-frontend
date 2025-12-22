interface HeadingProps {
  text: string;
  className: string;
}

const Heading = ({ text, className }: HeadingProps) => (
  <h2 className={`font-bold capitalize ${className}`}>{text}</h2>
);

export default Heading;
