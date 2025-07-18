import { useState, useReducer, useEffect, useRef } from 'react';
import { CirclePicker } from 'react-color';
import styles from './NewEntryModal.module.css';

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

export default function NewEntryModal({ isOpen, onClose, onSave }) {
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

  function handleSave() {
    onSave(state);
    onClose();
  }

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>
        <h2>Nuova Entry</h2>

        {step === 1 ? (
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.moodRow}>
              {['😊', '😐', '😢'].map((m) => (
                <button
                  key={m}
                  type="button"
                  className={state.mood === m ? styles.active : ''}
                  onClick={() =>
                    dispatch({ type: 'SET', field: 'mood', value: m })
                  }
                >
                  {m}
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
          </form>
        ) : (
          <div className={styles.form}>
            <div className={styles.colorPickerContainer}>
              <label htmlFor="color">Colore</label>
              <CirclePicker
                id="color"
                color={state.color}
                onChangeComplete={(col) =>
                  dispatch({
                    type: 'SET',
                    field: 'color',
                    value: col.hex,
                  })
                }
                circleSize={28}
                circleSpacing={12}
              />
            </div>
          </div>
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

          {step === 1 ? (
            <button
              type="button"
              className={styles.nextBtn}
              onClick={() => setStep(2)}
              disabled={!state.mood}
            >
              Avanti
            </button>
          ) : (
            <button
              type="button"
              className={styles.saveBtn}
              onClick={handleSave}
            >
              Salva
            </button>
          )}

          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}
