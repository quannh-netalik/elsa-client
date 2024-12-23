import { useContext } from 'react';
import { AppContext, AppContextType } from './App.context';

export const useAppContext = (): AppContextType => useContext(AppContext);
