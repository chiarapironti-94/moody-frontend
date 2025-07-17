import { useReducer, useEffect } from 'react';
import styles from './NewEntryModal.module.css';

const initialState = {
  mood: 'happy',
  rating: 5,
  color: '#8a2be2',
  note: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      throw new Error();
  }
}

export default function NewEntryModal({ isOpen, onClose, onSave }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mood, rating, color, note } = state;

  useEffect(() => {
    if (isOpen) dispatch({ type: 'RESET' });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-entry-title"
      >
        <h2 id="new-entry-title">Nuova Entry</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* 1) Mood selector: 3 faccine-only */}
          <div className={styles.moodRow}>
            {['happy', 'neutral', 'sad'].map((m) => (
              <button
                key={m}
                type="button"
                className={`${styles.moodBtn} ${
                  m === mood ? styles.active : ''
                }`}
                onClick={() =>
                  dispatch({ type: 'SET', field: 'mood', value: m })
                }
              >
                {m === 'happy' ? '😊' : m === 'neutral' ? '😐' : '😢'}
              </button>
            ))}
          </div>

          {/* 2) Rating + numero */}
          <div className={styles.formRow}>
            <label htmlFor="rating">Rating</label>
            <div className={styles.sliderWrap}>
              <input
                id="rating"
                name="rating"
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) =>
                  dispatch({
                    type: 'SET',
                    field: 'rating',
                    value: +e.target.value,
                  })
                }
              />
              <span className={styles.sliderValue}>{rating}</span>
            </div>
          </div>

          {/* 3) Color picker */}
          <div className={styles.formRow}>
            <label htmlFor="color">Colore</label>
            <input
              id="color"
              name="color"
              type="color"
              value={color}
              onChange={(e) =>
                dispatch({ type: 'SET', field: 'color', value: e.target.value })
              }
              className={styles.colorInput}
            />
          </div>

          {/* 4) Note */}
          <div className={styles.formRow}>
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              name="note"
              rows="4"
              value={note}
              onChange={(e) =>
                dispatch({ type: 'SET', field: 'note', value: e.target.value })
              }
              placeholder="Scrivi qualcosa…"
            />
          </div>

          {/* Azioni */}
          <div className={styles.actions}>
            <button type="button" onClick={onClose}>
              Annulla
            </button>
            <button type="submit">Salva</button>
          </div>
        </form>
      </div>
    </div>
  );
}
