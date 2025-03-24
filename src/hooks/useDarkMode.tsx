/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true);

    try {
      const storedPreference = localStorage.getItem("darkMode");
      if (storedPreference !== null) {
        const isDark = storedPreference === "true";
        setIsDarkMode(isDark);
        document.documentElement.classList.toggle("dark", isDark);
        return;
      }

      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } catch (error) {
      console.warn("Dark mode setting could not be retrieved. Brave Shields may be blocking localStorage.");
    }
  }, []);

  const toggleDarkMode = () => {
    if (!isMounted) return;

    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      document.documentElement.classList.toggle("dark", newDarkMode);
      localStorage.setItem("darkMode", newDarkMode.toString());
    } catch (error) {
      console.warn("Dark mode setting could not be saved. Brave Shields may be blocking localStorage.");
    }
  };

  return { isDarkMode, toggleDarkMode, isMounted };
}
