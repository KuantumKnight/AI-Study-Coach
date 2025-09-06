import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return {
    theme,
    resolvedTheme,
    changeTheme,
    mounted,
  };
};
