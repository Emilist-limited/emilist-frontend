import { useRef } from "react";

export const useHorizontalScroll = (
  onLoadMore: () => void,
  hasMore: boolean
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container && hasMore) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        onLoadMore();
      }
    }
  };

  return { containerRef, handleScroll };
};
