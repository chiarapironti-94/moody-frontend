import { useState, useReducer, useEffect, useRef } from 'react';
import { CirclePicker } from 'react-color';
import styles from './NewEntryModal.module.css';

const MOOD_OPTIONS = [
  { emoji: '😊', value: 'happy' },
  { emoji: '😐', value: 'neutral' },
  { emoji: '😢', value: 'sad' },
];

const initialState = {
  mood: '',
  rating: 5,
  color: '#a855f7',
  note: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function NewEntryModal({
  isOpen,
  onClose,
  onSave,
  saving = false,
  saveError = null,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState(1);
  const overlayRef = useRef();

  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'RESET' });
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(state);
  }

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>
        <h2>Nuova Entry</h2>

        {/* Step 1: non-form for mood, rating, note */}
        {step === 1 && (
          <div className={styles.form}>
            <div className={styles.moodRow}>
              {MOOD_OPTIONS.map(({ emoji, value }) => (
                <button
                  key={value}
                  type="button"
                  className={state.mood === value ? styles.active : ''}
                  onClick={() =>
                    dispatch({ type: 'SET', field: 'mood', value })
                  }
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div className={styles.formRow}>
              <label htmlFor="rating">Rating</label>
              <div className={styles.sliderWrap}>
                <input
                  id="rating"
                  type="range"
                  min="1"
                  max="10"
                  value={state.rating}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET',
                      field: 'rating',
                      value: +e.target.value,
                    })
                  }
                  style={{
                    background: `linear-gradient(
                      to right,
                      var(--color-primary) ${((state.rating - 1) / 9) * 100}%,
                      var(--color-primary-tint) ${
                        ((state.rating - 1) / 9) * 100
                      }%
                    )`,
                  }}
                />
                <span className={styles.sliderValue}>{state.rating}</span>
              </div>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="note">Note</label>
              <textarea
                id="note"
                value={state.note}
                onChange={(e) =>
                  dispatch({
                    type: 'SET',
                    field: 'note',
                    value: e.target.value,
                  })
                }
                placeholder="Scrivi qualcosa…"
              />
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.nextBtn}
                onClick={() => setStep(2)}
                disabled={!state.mood}
              >
                Avanti
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Annulla
              </button>
            </div>
          </div>
        )}

        {/* Step 2: form wrapper for color picker + save */}
        {step === 2 && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.colorPickerContainer}>
              <label htmlFor="color">Colore</label>
              <CirclePicker
                id="color"
                color={state.color}
                onChangeComplete={(col) =>
                  dispatch({ type: 'SET', field: 'color', value: col.hex })
                }
                circleSize={28}
                circleSpacing={12}
              />
            </div>

            {saveError && (
              <div className={styles.errorMsg}>
                Errore durante il salvataggio: {saveError.message}
              </div>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => setStep(1)}
              >
                Indietro
              </button>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={saving}
              >
                {saving ? 'Salvando…' : 'Salva'}
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Annulla
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
