import { useRef } from "react";

export const useThrottleFn = (
  callback: (...args: any[]) => void,
  delay = 800
) => {
  const lastCall = useRef(0);

  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  };
};
