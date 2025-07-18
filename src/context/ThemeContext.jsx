import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import tinycolor from 'tinycolor2';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PREFERENCES } from './../graphql/queries';
import { UPDATE_PREFERENCES } from './../graphql/mutations';

const AVAILABLE_COLORS = [
  '#ff595e',
  '#ffca3a',
  '#8ac926',
  '#1982c4',
  '#6a4c93',
];

const ThemeContext = createContext({
  primary: AVAILABLE_COLORS[0],
  setPrimary: () => {},
  available: AVAILABLE_COLORS,
});

export function ThemeProvider({ children }) {
  const { data, loading, error } = useQuery(GET_PREFERENCES);
  const [updatePrefs] = useMutation(UPDATE_PREFERENCES);
  const [primary, setPrimaryState] = useState(AVAILABLE_COLORS[0]);

  useLayoutEffect(() => {
    if (!loading && data?.preferences?.themeColor) {
      setPrimaryState(data.preferences.themeColor);
    }
  }, [loading, data]);

  useEffect(() => {
    const light = tinycolor(primary).lighten(20).toString();
    const dark = tinycolor(primary).darken(15).toString();
    const tint = tinycolor(primary).lighten(37).toString();
    const tintLight = tinycolor(primary).lighten(45).toString();
    const darkText = tinycolor(primary).darken(40).toString();
    const root = document.documentElement;
    root.style.setProperty('--color-primary', primary);
    root.style.setProperty('--color-primary-light', light);
    root.style.setProperty('--color-primary-dark', dark);
    root.style.setProperty('--color-primary-tint', tint);
    root.style.setProperty('--color-primary-tint-light', tintLight);
    root.style.setProperty('--text-primary-dark', darkText);
  }, [primary]);

  const setPrimary = async (color) => {
    setPrimaryState(color);
    try {
      await updatePrefs({ variables: { themeColor: color } });
    } catch (e) {
      console.error('Errore aggiornamento preferenze:', e);
    }
  };

  if (loading) return null;
  if (error) return <div>Errore caricamento preferenze</div>;

  return (
    <ThemeContext.Provider
      value={{ primary, setPrimary, available: AVAILABLE_COLORS }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
