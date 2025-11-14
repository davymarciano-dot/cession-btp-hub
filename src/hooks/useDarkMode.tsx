import { useState, useEffect } from 'react';

export const useDarkMode = (): [boolean, (value: boolean) => void] => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved ? saved === 'true' : prefersDark;
  });
  
  useEffect(() => {
    localStorage.setItem('darkMode', String(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  
  return [isDark, setIsDark];
};
