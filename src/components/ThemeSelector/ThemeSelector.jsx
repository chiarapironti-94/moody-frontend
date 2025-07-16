import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useTheme } from './../../context/ThemeContext';
import { UPDATE_PREFERENCES } from './../../graphql/mutations';
import styles from './ThemeSelector.module.css';

export default function ThemeSelector() {
  const [updatePrefs] = useMutation(UPDATE_PREFERENCES);

  const { primary, setPrimary, available } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onClick = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  const handleSelect = async (color) => {
    setPrimary(color);
    setOpen(false);
    try {
      await updatePrefs({
        variables: { themeColor: color },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.swatchDropdown} ref={ref}>
      <button
        className={styles.swatchBtn}
        onClick={() => setOpen((o) => !o)}
        aria-label="Cambia tema"
      >
        <span
          className={styles.swatchCircle}
          style={{ backgroundColor: primary }}
        />
      </button>
      {open && (
        <div className={styles.swatchMenu}>
          {available.map((color) => (
            <button
              key={color}
              className={styles.swatchItem}
              style={{ backgroundColor: color }}
              onClick={() => handleSelect(color)}
              aria-label={`Seleziona ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
