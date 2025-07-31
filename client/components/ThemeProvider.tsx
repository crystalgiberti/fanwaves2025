'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'team-chiefs' | 'team-cowboys' | 'team-alabama' | 'team-buckeyes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  teamColors: Record<string, string>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const teamThemes = {
  'team-chiefs': {
    primary: '#E31837',
    secondary: '#FFB81C',
    accent: '#FFFFFF',
    background: '#1a0507',
    foreground: '#FFFFFF',
  },
  'team-cowboys': {
    primary: '#003594',
    secondary: '#041E42',
    accent: '#B0B7BC',
    background: '#000a1a',
    foreground: '#FFFFFF',
  },
  'team-alabama': {
    primary: '#9E1B32',
    secondary: '#828A8F',
    accent: '#FFFFFF',
    background: '#1a0508',
    foreground: '#FFFFFF',
  },
  'team-buckeyes': {
    primary: '#BB0000',
    secondary: '#C0C0C0',
    accent: '#FFFFFF',
    background: '#1a0000',
    foreground: '#FFFFFF',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [teamColors, setTeamColors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('fan-waves-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'team-chiefs', 'team-cowboys', 'team-alabama', 'team-buckeyes');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Set CSS custom properties for team themes
    if (theme.startsWith('team-')) {
      const colors = teamThemes[theme as keyof typeof teamThemes];
      if (colors) {
        Object.entries(colors).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value);
        });
        setTeamColors(colors);
      }
    } else {
      // Reset to default colors for light/dark themes
      setTeamColors({});
    }
    
    // Save theme to localStorage
    localStorage.setItem('fan-waves-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, teamColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme Switcher Component
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; label: string; colors: string[] }[] = [
    { value: 'light', label: 'Light', colors: ['#ffffff', '#000000'] },
    { value: 'dark', label: 'Dark', colors: ['#000000', '#ffffff'] },
    { value: 'team-chiefs', label: 'Chiefs', colors: ['#E31837', '#FFB81C'] },
    { value: 'team-cowboys', label: 'Cowboys', colors: ['#003594', '#041E42'] },
    { value: 'team-alabama', label: 'Alabama', colors: ['#9E1B32', '#828A8F'] },
    { value: 'team-buckeyes', label: 'Buckeyes', colors: ['#BB0000', '#C0C0C0'] },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((themeOption) => (
        <button
          key={themeOption.value}
          onClick={() => setTheme(themeOption.value)}
          className={`
            px-3 py-2 rounded-lg text-sm font-medium transition-all
            ${theme === themeOption.value 
              ? 'ring-2 ring-primary shadow-lg' 
              : 'hover:shadow-md'
            }
          `}
          style={{
            background: `linear-gradient(135deg, ${themeOption.colors[0]}, ${themeOption.colors[1]})`,
            color: themeOption.value === 'light' ? '#000000' : '#ffffff'
          }}
        >
          {themeOption.label}
        </button>
      ))}
    </div>
  );
}

// Team Color Extractor Hook
export function useTeamColors(teamSlug?: string) {
  const { teamColors } = useTheme();
  
  // Default team color mappings
  const defaultTeamColors: Record<string, { primary: string; secondary: string }> = {
    'chiefs': { primary: '#E31837', secondary: '#FFB81C' },
    'cowboys': { primary: '#003594', secondary: '#041E42' },
    'crimson-tide': { primary: '#9E1B32', secondary: '#828A8F' },
    'buckeyes': { primary: '#BB0000', secondary: '#C0C0C0' },
    'patriots': { primary: '#002244', secondary: '#C60C30' },
    'packers': { primary: '#203731', secondary: '#FFB612' },
    'steelers': { primary: '#FFB612', secondary: '#000000' },
    'bears': { primary: '#0B162A', secondary: '#C83803' },
  };

  if (teamSlug && defaultTeamColors[teamSlug]) {
    return defaultTeamColors[teamSlug];
  }

  return {
    primary: teamColors.primary || '#00d4ff',
    secondary: teamColors.secondary || '#3b82f6'
  };
}
