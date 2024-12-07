'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ====================================
// ====================================
// ====================================
// ====================================

// Define the shape of the context state
interface AppState {
  state: string | null;
  setState: (slug: string | null) => void;
}

// ====================================
// ====================================
// ====================================
// ====================================

// Create the context with a default value (optional)
const AppContext = createContext<AppState | undefined>(undefined);

// ====================================
// ====================================
// ====================================
// ====================================

// Create the provider component
export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<string | null>(null);

  useEffect(() => console.log('app context state: ', state), [state]);

  const context = { state, setState };

  return (
    <AppContext.Provider value={context}>
      { children }
    </AppContext.Provider>
  );
};

// ====================================
// ====================================
// ====================================
// ====================================

// Custom hook for consuming the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};