'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ====================================
// ====================================
// ====================================
// ====================================

// Define the shape of the state variable
type Point = {
  component?: string;
  node_num?:  number;
  comp_id?:   number;
};
type State = { 
  selected: string, 
  click_num: number,
  comp_count: number,
  matrix: Point[][],
};

const init_state: State = {
  selected: '',
  click_num: 0,
  comp_count: 0,
  matrix: [
    [ {}, {}, {} ],
    [ {}, {}, {} ],
    [ {}, {}, {} ],
    [ {}, {}, {} ],
    [ {}, {}, {} ],
  ],
};

// Define the shape of the context state
type AppState = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
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
  const [state, setState] = useState<State>(init_state);

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