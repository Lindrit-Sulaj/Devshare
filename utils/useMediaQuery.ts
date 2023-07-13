"use client"
import { useState, useEffect, useMemo } from "react"

interface Breakpoints {
  [breakpoint: string]: number
}

const screenBreakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export default function useMediaQuery(): string {
  const [windowWidth, setWindowWidth] = useState(0);
  const [breakpoint, setBreakpoint] = useState("");

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => handleResize(), []);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMemo(() => {
    let currentBreakpoint = 'sm';

    for (let breakpoint in screenBreakpoints) {
      if (windowWidth >= screenBreakpoints[breakpoint]) {
        currentBreakpoint = breakpoint;
      };
    };

    setBreakpoint(currentBreakpoint);
  }, [windowWidth]);

  return breakpoint;
}