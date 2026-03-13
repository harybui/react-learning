import { createContext, useContext, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

//Tạo ThemeContext với giá trị mặc định null
const ThemeContext = createContext<ThemeContextType | null>(null);

//Custem Hook để dùng trong component
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

//Provider component bọc quanh toàn bộ app
export const ThemeProvider= ({children}: {children: React.ReactNode}) => {
    const[theme, setTheme]= useState<"light" | "dark">("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light"? "dark" :"light"));
    }
    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
