import { useState, useMemo, useRef } from 'react'

const QUESTIONS = [
  "Maaf kari didho tara baby ne? 🥺",
  "Sachhi nahi maaf kare? 🥺💔",
  "Bav gusso chhe mari par bacha? 🥺",
  "Plz maani ja ne bacha... 🙏💗",
  "Ek chance to aapo baby! 🥺✨",
  "Tari favorite chocolates & gifts aapis, haa padi de ne! 🍫🎁",
  "Mari mistake chhe hu manu chu, pan forgive karvanu tame ne? 🥺",
  "Jojo hu radva lagyo... 😭 😭",
  "Tane mari daya nathi aavti baby? 🥺💔",
  "Mari samne joyine Na bol to mari baby... 🥺",
  "Hu tane kyarey gusso nai karish, promise! 🤝❤️",
  "Aavuj karvanu mara jode? 😭💙",
  "Mari jaan, please ek vaar haa bol de ne... 💖",
  "Hu tara vagar nai rahi shaku, maaf kari de ne baby! 🥺",
]

const LOVELY_WORDS = [
  'Thank',
  'you',
  'so',
  'much',
  'my',
  'wifey',
  'i',
  'love',
  'you',
  'so',
  'much',
  'baby',
]

function LetterScreen({ onYes }) {
  const [step, setStep] = useState('letter') // 'letter' | 'question' | 'lovely_message'
  const [noCount, setNoCount] = useState(0)
  const [loveHearts, setLoveHearts] = useState([])
  const [customPhoto, setCustomPhoto] = useState(null)

  const fileInputRef = useRef(null)

  const petals = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 10 + 8,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 15,
      rotation: Math.random() * 360,
    }))
  }, [])

  const currentQuestion = QUESTIONS[noCount % QUESTIONS.length]

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1)
  }

  const handleYesClick = () => {
    setStep('lovely_message')
    if (onYes) {
      onYes()
    }
  }

  const triggerLoveBurst = () => {
    const newHearts = Array.from({ length: 25 }, (_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 80 + 10}%`,
      bottom: `${Math.random() * 20 + 10}%`,
      size: Math.random() * 20 + 18,
      speed: Math.random() * 1.5 + 1,
    }))
    setLoveHearts((prev) => [...prev, ...newHearts])
    setTimeout(() => {
      setLoveHearts([])
    }, 2500)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setCustomPhoto(url)
    }
  }

  return (
    <div className="letter-screen">
      {/* Ambient glowing orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      {/* Floating petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="rgba(105, 210, 231, 0.4)"
            />
          </svg>
        </div>
      ))}

      {/* Love Hearts Burst when Send Love Back clicked */}
      {loveHearts.map((h) => (
        <div
          key={h.id}
          className="burst-heart"
          style={{
            left: h.left,
            bottom: h.bottom,
            fontSize: `${h.size}px`,
            animationDuration: `${h.speed}s`,
          }}
        >
          💖
        </div>
      ))}

      {/* STEP 1: The Sorry Letter */}
      {step === 'letter' && (
        <div className="letter-card">
          <div className="letter-header">
            <p className="letter-date">from the bottom of my heart</p>
            <h1 className="letter-heading">
              I'm Sorry <span className="signature-heart">♥</span>
            </h1>
          </div>

          <div className="letter-body">
            <p className="letter-greeting">My Dear Baby,</p>

            <p className="letter-paragraph">
              I know I am wrong... but that doesn't mean apne alag thai jai.
              <span className="letter-highlight"> Sorry baby,</span> mari bhul
              hase to tu mane maaf kari de bacha. 🥺
            </p>

            <p className="letter-paragraph">
              Mane tara vagar kai nai gamtu.
              <span className="letter-highlight"> I miss you my world.</span>{' '}
              I love you so muchhhhhhhhhh myyyyyyyyyy baby!{' '}
              <span className="signature-heart">♥</span>
            </p>

            <p className="letter-paragraph">
              Je thayu ae maro vak hato... me mari baby par gusso karyo,
              na karvo joiae mare. I am so sorry bacha. 😞
            </p>

            <p className="letter-paragraph">
              <span className="letter-highlight">Please maaf kari de...</span>{' '}
              mari jode re. Hu tane bav love karish, bav j. 🤗
              <span className="signature-heart">♥</span>
            </p>
          </div>

          <div className="letter-footer">
            <p className="letter-closing">Forever yours,</p>
            <p className="letter-signature">
              Your Baby <span className="signature-heart">♥</span>
            </p>
          </div>

          {/* NEXT BUTTON AT THE BOTTOM OF THE SORRY MESSAGE */}
          <div className="letter-action-container">
            <button
              className="next-btn"
              onClick={() => setStep('question')}
            >
              Next <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: The Question Card (Maaf kari didho tara baby ne?) */}
      {step === 'question' && (
        <div className="letter-card question-card">
          <div className="question-header">
            <span className="question-badge">A sweet question for my baby 🥺</span>
            <h2 className="question-title">{currentQuestion}</h2>
          </div>

          <div className="question-buttons">
            <button
              className="yes-btn"
              onClick={handleYesClick}
            >
              Haa, Maaf Kari Didho! 💖
            </button>

            <button
              className="no-btn"
              onClick={handleNoClick}
            >
              Na 🥺
            </button>
          </div>

          {noCount > 0 && (
            <p className="question-counter-hint">
              {noCount === 1 && "Pleeeease bacha... Ek chance to aapo! 🥺"}
              {noCount >= 2 && `Tame ${noCount} vaar Na karyu... pan baby to puchya j karse! 🥺💙`}
            </p>
          )}
        </div>
      )}

      {/* STEP 3: The New Lovely Message with Neon Typing and Picture */}
      {step === 'lovely_message' && (
        <div className="letter-card lovely-card">
          <div className="letter-header">
            <p className="letter-date">my happiest moment ✨</p>
            <h1 className="letter-heading lovely-heading">
              Yayyyyy! 💖🎉
            </h1>
          </div>

          <div className="letter-body neon-body">
            {/* ONE BY ONE NEON LIGHT PINK & LIGHT BLUE LETTER ANIMATION */}
            <div className="neon-message-wrapper">
              {LOVELY_WORDS.map((word, wordIndex) => {
                const previousLettersCount = LOVELY_WORDS
                  .slice(0, wordIndex)
                  .reduce((acc, w) => acc + w.length, 0)

                return (
                  <div key={wordIndex} className="neon-word">
                    {word.split('').map((char, charIndex) => {
                      const globalIndex = previousLettersCount + charIndex
                      const isPink = globalIndex % 2 === 0
                      return (
                        <span
                          key={charIndex}
                          className={`neon-letter ${isPink ? 'pink' : 'blue'}`}
                          style={{ animationDelay: `${globalIndex * 0.08 + 0.3}s` }}
                        >
                          {char}
                        </span>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            {/* COUPLE PICTURE REVEALED AFTER NEON ANIMATION */}
            <div className="couple-pic-card">
              <div
                className="couple-img-wrapper"
                onClick={() => fileInputRef.current?.click()}
                title="Click to change photo"
              >
                <img
                  src={customPhoto || '/couple.png'}
                  alt="Romantic Couple"
                  className="couple-img"
                />
                <div className="couple-img-overlay">
                  <span className="upload-hint">📸 Change Photo</span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />

              <p className="couple-caption">
                Forever & Always <span className="signature-heart">♥</span>
              </p>
            </div>
          </div>

          <div className="letter-footer">
            <p className="letter-closing">Forever yours,</p>
            <p className="letter-signature">
              Your Baby <span className="signature-heart">♥</span>
            </p>
          </div>

          <div className="letter-action-container">
            <button
              className="love-burst-btn"
              onClick={triggerLoveBurst}
            >
              Send Love Back 💖✨
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LetterScreen
