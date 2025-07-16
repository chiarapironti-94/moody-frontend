import { useReducer, useEffect } from 'react';
import styles from './NewEntryModal.module.css';

const initialState = {
  mood: '',
  rating: 1,
  color: '',
  note: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function NewEntryModal({ isOpen, onClose, onSave }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mood, rating, color, note } = state;

  useEffect(() => {
    if (isOpen) dispatch({ type: 'RESET' });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_FIELD',
      field: name,
      value: name === 'rating' ? +value : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2>Nuova Entry</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Umore
            <select name="mood" value={mood} onChange={handleChange}>
              <option value="happy">😊 Happy</option>
              <option value="neutral">😐 Neutral</option>
              <option value="sad">😢 Sad</option>
            </select>
          </label>

          <label>
            Rating ({rating})
            <input
              type="range"
              name="rating"
              min="1"
              max="10"
              value={rating}
              onChange={handleChange}
            />
          </label>

          <label>
            Colore
            <input
              type="color"
              name="color"
              value={color}
              onChange={handleChange}
            />
          </label>

          <label>
            Note
            <textarea
              name="note"
              rows="3"
              value={note}
              onChange={handleChange}
              placeholder="Scrivi qualcosa…"
            />
          </label>

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
