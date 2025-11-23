import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useLeftSidebar = (onCollapse?: (v: boolean) => void) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    const newValue = !isCollapsed;
    setIsCollapsed(newValue);
    onCollapse?.(newValue);
  };

  return { isCollapsed, toggleCollapse, location };
};
