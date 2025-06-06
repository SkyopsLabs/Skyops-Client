import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage(
    "color-theme",
    typeof window !== "undefined"
      ? (localStorage.getItem("color-theme") as string)
      : "light",
  );

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.documentElement.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return { colorMode, setColorMode };
};

export default useColorMode;
