import {useState, useMemo, useCallback } from "react";
import { ThemeCustomeContext } from "./ThemeCustomeContext";



export function ThemeCustomeProvider({ children }) {
    const [theme, setTheme] = useState("dark");
  
 const toggleTheme = useCallback(() => {
    setTheme(t => (t === "dark" ? "light" : "dark"));
  }, []);
  
    const value = useMemo(
    () => ({
        theme, 
        setTheme,
        toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeCustomeContext.Provider value={value}>
      {children}
    </ThemeCustomeContext.Provider>
  );
}

