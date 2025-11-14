import { useDarkMode } from '@/hooks/useDarkMode';
import { Button } from '@/components/ui/button';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useDarkMode();
  
  return (
    <Button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-6 left-6 rounded-full shadow-lg z-40"
      size="icon"
      variant="secondary"
    >
      {isDark ? '☀️' : '🌙'}
    </Button>
  );
};

export default DarkModeToggle;
