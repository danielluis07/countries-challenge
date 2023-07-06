"use client";

import { useTheme } from "next-themes";
import { HiMoon } from "react-icons/hi";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-2 cursor-pointer">
      <HiMoon className="text-xl" />
      <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Dark Mode
      </div>
    </div>
  );
};

export default ToggleTheme;
