import { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from './../../context/ThemeContext';
import styles from './ThemeSelector.module.css';

export default function ThemeSelector() {
  const { primary, setPrimary, available } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const toggleOpen = useCallback(() => setOpen((o) => !o), []);
  const handleSelect = useCallback(
    (color) => {
      setPrimary(color);
      setOpen(false);
    },
    [setPrimary]
  );

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className={styles.swatchDropdown} ref={ref}>
      <button
        className={styles.swatchBtn}
        onClick={toggleOpen}
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
