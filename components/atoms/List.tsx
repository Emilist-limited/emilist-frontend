interface ListProps {
  items: string[];
  className: string;
}

const List = ({ items, className }: ListProps) => (
  <ul className={`list-disc pl-6 ${className}`}>
    {items.map((item, index) => (
      <li key={index} className="my-1">
        {item}
      </li>
    ))}
  </ul>
);

export default List;
