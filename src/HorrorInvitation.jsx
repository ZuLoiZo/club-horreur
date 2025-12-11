import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { eventConfig } from './config';

const HorrorInvitation = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState('');
  const [state, handleSubmit] = useForm("xrbnobgj");

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const { films, date, heure, lieu } = eventConfig;

  return (
    <div style={styles.container}>
      {/* Atmospheric background elements */}
      <div style={styles.fogOverlay}></div>
      <div style={styles.noiseOverlay}></div>

      {/* Bats Animation Container */}
      <div style={{
        ...styles.batsContainer,
        opacity: isRevealed ? 0 : 1,
        pointerEvents: isRevealed ? 'none' : 'auto',
      }}>
        {/* Left Bat */}
        <div
          className={isRevealed ? 'bat-fly-left' : ''}
          style={styles.batWrapper}
        >
          <img
            src="/bat-left.png"
            alt="Chauve-souris gauche"
            style={styles.batImage}
          />
        </div>

        {/* Right Bat */}
        <div
          className={isRevealed ? 'bat-fly-right' : ''}
          style={styles.batWrapper}
        >
          <img
            src="/bat-right.png"
            alt="Chauve-souris droite"
            style={styles.batImage}
          />
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        ...styles.content,
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'scale(1)' : 'scale(0.9)',
      }}>
        <div style={styles.ornamentTop}>❧</div>

        <h1 style={styles.title}>Ciné-Club de l'Horreur</h1>

        <div style={styles.subtitle}>Vous êtes cordialement conviés à une soirée d'épouvante</div>

        <div style={styles.details}>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Date</span>
            <span style={styles.detailValue}>{date}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Heure</span>
            <span style={styles.detailValue}>{heure}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Lieu</span>
            <span style={styles.detailValue}>{lieu}</span>
          </div>
        </div>

        <div style={styles.divider}>☽ ☾</div>

        <h2 style={styles.sectionTitle}>Les Films au Programme</h2>
        <p style={styles.voteInstruction}>Votez pour votre film préféré</p>

        <div style={styles.filmsContainer}>
          {films.map((film) => (
            <label
              key={film.id}
              style={{
                ...styles.filmCard,
                ...(selectedFilm === film.id ? styles.filmCardSelected : {}),
              }}
            >
              <input
                type="radio"
                name="film"
                value={film.title}
                checked={selectedFilm === film.id}
                onChange={() => setSelectedFilm(film.id)}
                style={styles.radioHidden}
              />
              <div style={styles.filmTitle}>{film.title}</div>
              <div style={styles.filmMeta}>{film.year} • {film.director}</div>
            </label>
          ))}
        </div>

        <div style={styles.divider}>☽ ☾</div>

        {!state.succeeded ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.sectionTitle}>Confirmez Votre Présence</h2>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="name">Votre Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                style={styles.input}
                placeholder="Entrez votre nom..."
              />
              <ValidationError prefix="Nom" field="name" errors={state.errors} style={styles.errorText} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Serez-vous des nôtres ?</label>
              <div style={styles.radioGroup}>
                <label style={styles.radioLabel}>
                  <input type="radio" name="presence" value="Oui, je serai là" required style={styles.radio} />
                  <span>Oui, je brave les ténèbres</span>
                </label>
                <label style={styles.radioLabel}>
                  <input type="radio" name="presence" value="Non, je ne pourrai pas" style={styles.radio} />
                  <span>Non, la peur me retient</span>
                </label>
              </div>
              <ValidationError prefix="Présence" field="presence" errors={state.errors} style={styles.errorText} />
            </div>

            <input type="hidden" name="film_choice" value={selectedFilm ? films.find(f => f.id === selectedFilm)?.title : ''} />

            <button type="submit" disabled={state.submitting} style={{
              ...styles.submitButton,
              opacity: state.submitting ? 0.6 : 1,
              cursor: state.submitting ? 'wait' : 'pointer',
            }}>
              {state.submitting ? 'Envoi en cours...' : 'Sceller Mon Destin'}
            </button>
          </form>
        ) : (
          <div style={styles.confirmation}>
            <div style={styles.confirmationIcon}>🦇</div>
            <h2 style={styles.confirmationTitle}>Votre réponse a été enregistrée</h2>
            <p style={styles.confirmationText}>Nous vous attendons dans les ténèbres...</p>
          </div>
        )}

        <div style={styles.ornamentBottom}>❧</div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          background: #0a0a0a;
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes flyLeftSwirl {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          20% {
            transform: translateX(-15vw) translateY(-20vh) rotate(-45deg);
          }
          40% {
            transform: translateX(-35vw) translateY(10vh) rotate(-120deg);
          }
          60% {
            transform: translateX(-55vw) translateY(-15vh) rotate(-200deg);
          }
          80% {
            transform: translateX(-80vw) translateY(5vh) rotate(-300deg);
          }
          100% {
            transform: translateX(-120vw) translateY(-10vh) rotate(-360deg);
          }
        }

        @keyframes flyRightSwirl {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          20% {
            transform: translateX(15vw) translateY(-20vh) rotate(45deg);
          }
          40% {
            transform: translateX(35vw) translateY(10vh) rotate(120deg);
          }
          60% {
            transform: translateX(55vw) translateY(-15vh) rotate(200deg);
          }
          80% {
            transform: translateX(80vw) translateY(5vh) rotate(300deg);
          }
          100% {
            transform: translateX(120vw) translateY(-10vh) rotate(360deg);
          }
        }

        .bat-fly-left {
          animation: flyLeftSwirl 2s ease-in-out forwards;
        }

        .bat-fly-right {
          animation: flyRightSwirl 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)',
    color: '#d4c4a8',
    fontFamily: '"Crimson Text", Georgia, serif',
    position: 'relative',
    overflow: 'hidden',
  },
  fogOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
    pointerEvents: 'none',
  },
  noiseOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    pointerEvents: 'none',
  },
  batsContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    background: '#0a0a0a',
    transition: 'opacity 1.5s ease-out 0.5s',
  },
  batWrapper: {
    width: '80vmin',
    maxWidth: '800px',
  },
  batImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '80vh',
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 30px rgba(139, 0, 0, 0.6))',
  },
  content: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '60px 30px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 10,
    transition: 'opacity 1s ease-out 0.5s, transform 1s ease-out 0.5s',
  },
  ornamentTop: {
    fontSize: '3rem',
    color: '#8B0000',
    marginBottom: '20px',
    transform: 'rotate(180deg)',
    textShadow: '0 0 20px rgba(139, 0, 0, 0.5)',
  },
  title: {
    fontFamily: '"Cinzel Decorative", "Times New Roman", serif',
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontWeight: 700,
    color: '#c9b896',
    margin: '0 0 20px 0',
    textShadow: '0 0 40px rgba(139, 0, 0, 0.3), 2px 2px 4px rgba(0,0,0,0.8)',
    letterSpacing: '0.1em',
  },
  subtitle: {
    fontSize: '1.3rem',
    fontStyle: 'italic',
    color: '#a89880',
    marginBottom: '40px',
    letterSpacing: '0.05em',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    margin: '40px 0',
    padding: '30px',
    background: 'rgba(139, 0, 0, 0.1)',
    border: '1px solid rgba(139, 0, 0, 0.3)',
    borderRadius: '4px',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  detailLabel: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: '#8B0000',
  },
  detailValue: {
    fontSize: '1.4rem',
    fontFamily: '"Cinzel Decorative", serif',
    color: '#d4c4a8',
  },
  divider: {
    fontSize: '1.5rem',
    color: '#8B0000',
    margin: '40px 0',
    letterSpacing: '0.5em',
    opacity: 0.7,
  },
  sectionTitle: {
    fontFamily: '"Cinzel Decorative", serif',
    fontSize: '1.6rem',
    color: '#c9b896',
    margin: '0 0 10px 0',
    letterSpacing: '0.1em',
  },
  voteInstruction: {
    fontSize: '1rem',
    fontStyle: 'italic',
    color: '#a89880',
    margin: '0 0 25px 0',
  },
  filmsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    margin: '20px 0',
  },
  filmCard: {
    padding: '20px',
    background: 'rgba(20, 15, 15, 0.8)',
    border: '1px solid rgba(139, 0, 0, 0.3)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: '#8B0000',
    },
  },
  filmCardSelected: {
    borderColor: '#8B0000',
    background: 'rgba(139, 0, 0, 0.15)',
    boxShadow: '0 0 20px rgba(139, 0, 0, 0.3), inset 0 0 30px rgba(139, 0, 0, 0.1)',
  },
  radioHidden: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
  },
  filmTitle: {
    fontFamily: '"Cinzel Decorative", serif',
    fontSize: '1.3rem',
    color: '#d4c4a8',
    marginBottom: '5px',
  },
  filmMeta: {
    fontSize: '0.9rem',
    color: '#8a7a68',
  },
  form: {
    margin: '30px 0',
    textAlign: 'left',
  },
  formGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#8B0000',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '15px',
    background: 'rgba(20, 15, 15, 0.9)',
    border: '1px solid rgba(139, 0, 0, 0.3)',
    borderRadius: '4px',
    color: '#d4c4a8',
    fontSize: '1rem',
    fontFamily: '"Crimson Text", Georgia, serif',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: '0.85rem',
    marginTop: '8px',
    fontStyle: 'italic',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '12px 15px',
    background: 'rgba(20, 15, 15, 0.6)',
    border: '1px solid rgba(139, 0, 0, 0.2)',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  },
  radio: {
    accentColor: '#8B0000',
    width: '18px',
    height: '18px',
  },
  submitButton: {
    width: '100%',
    padding: '18px 30px',
    background: 'linear-gradient(180deg, #8B0000 0%, #5a0000 100%)',
    border: '1px solid #a00000',
    borderRadius: '4px',
    color: '#d4c4a8',
    fontSize: '1.1rem',
    fontFamily: '"Cinzel Decorative", serif',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    boxShadow: '0 4px 20px rgba(139, 0, 0, 0.4)',
    marginTop: '20px',
  },
  confirmation: {
    padding: '40px',
    background: 'rgba(139, 0, 0, 0.1)',
    border: '1px solid rgba(139, 0, 0, 0.3)',
    borderRadius: '4px',
    margin: '30px 0',
  },
  confirmationIcon: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  confirmationTitle: {
    fontFamily: '"Cinzel Decorative", serif',
    fontSize: '1.4rem',
    color: '#c9b896',
    margin: '0 0 10px 0',
  },
  confirmationText: {
    fontStyle: 'italic',
    color: '#a89880',
    margin: 0,
  },
  ornamentBottom: {
    fontSize: '3rem',
    color: '#8B0000',
    marginTop: '40px',
    textShadow: '0 0 20px rgba(139, 0, 0, 0.5)',
  },
};

export default HorrorInvitation;
