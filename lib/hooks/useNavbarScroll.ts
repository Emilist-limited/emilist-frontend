import { useEffect, useState } from "react";

export const useNavbarScroll = () => {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [isHeightGreaterThanScreen, setIsHeightGreaterThanScreen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const screenHeight = window.innerHeight;

      // Hide navbar if scrolling down a bit
      if (currentScroll > 200 && currentScroll < screenHeight) {
        setVisible(false);
        setIsHeightGreaterThanScreen(false);
      }
      // Show navbar if scrolled past the height of the screen
      else if (currentScroll > screenHeight) {
        setVisible(true);
        setIsHeightGreaterThanScreen(true);
      } else {
        setVisible(true);
        setIsHeightGreaterThanScreen(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return { visible, isHeightGreaterThanScreen };
};
