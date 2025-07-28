import { useReducer, useEffect, useRef, useState } from 'react';
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

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (state.mood) setStep(2);
    } else {
      onSave({
        mood: state.mood,
        rating: state.rating,
        note: state.note,
        color: state.color,
      });
      onClose();
      dispatch({ type: 'RESET' });
    }
  };

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <h2>Nuova Entry — Step {step} di 2</h2>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          {step === 1 && (
            <>
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
                      background: `linear-gradient(to right, var(--color-primary) ${
                        ((state.rating - 1) / 9) * 100
                      }%, var(--color-primary-tint) ${
                        ((state.rating - 1) / 9) * 100
                      }%)`,
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
            </>
          )}

          {step === 2 && (
            <div className={styles.colorPickerContainer}>
              <label htmlFor="color">
                Which color does your mood feel like?
              </label>
              <CirclePicker
                id="color"
                color={state.color}
                onChangeComplete={(col) =>
                  dispatch({ type: 'SET', field: 'color', value: col.hex })
                }
                circleSize={28}
                styles={{ default: { picker: { margin: '0' } } }}
              />
            </div>
          )}

          {saveError && (
            <div className={styles.errorMsg}>Errore: {saveError.message}</div>
          )}

          <div className={styles.actions}>
            {step === 2 && (
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => setStep(1)}
              >
                Indietro
              </button>
            )}
            <button
              type="submit"
              className={step === 1 ? styles.nextBtn : styles.saveBtn}
              disabled={step === 1 ? !state.mood : saving}
            >
              {step === 1 ? 'Avanti' : saving ? 'Salvando…' : 'Salva'}
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
      </div>
    </div>
  );
}
