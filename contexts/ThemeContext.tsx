import { getFromAsyncStorage, saveToAsyncStorage } from "@/utils/storage";
import { Theme } from "@/utils/type";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

type ThemeContextType = {
  theme: Theme;
  useToggleTheme: (newTheme: Theme) => void;
  useSystemTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(colorScheme || "light");
  const [themeLoading, setThemeLoading] = useState(true);
  const [isSystemTheme, setIsSystemTheme] = useState<boolean>(false);

  // Load theme preference on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await getFromAsyncStorage("theme");
        const savedSystemPreference = await getFromAsyncStorage(
          "systemPreference"
        );

        if (savedTheme) {
          setTheme(savedTheme as Theme);
        }

        // Check if system preference was enabled previously
        if (savedSystemPreference === "true") {
          setIsSystemTheme(true);
          setTheme(colorScheme as Theme);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      } finally {
        setThemeLoading(false);
      }
    };

    loadTheme();
  }, [colorScheme]);

  useEffect(() => {
    if (isSystemTheme) {
      setTheme(colorScheme as Theme);
      saveToAsyncStorage("theme", colorScheme as Theme);
    }
  }, [colorScheme, isSystemTheme]);

  // Toggle to a specific theme
  const useToggleTheme = async (newTheme: Theme) => {
    setIsSystemTheme(false);
    setTheme(newTheme);
    await saveToAsyncStorage("theme", newTheme);
    await saveToAsyncStorage("systemPreference", "false");
  };

  // Enable system theme
  const useSystemTheme = async () => {
    setIsSystemTheme(true);
    setTheme(colorScheme as Theme);
    await saveToAsyncStorage("theme", colorScheme as Theme);
    await saveToAsyncStorage("systemPreference", "true");
  };

  const value = useMemo(
    () => ({
      theme,
      useToggleTheme,
      useSystemTheme,
    }),
    [theme, useToggleTheme, useSystemTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {!themeLoading && children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
