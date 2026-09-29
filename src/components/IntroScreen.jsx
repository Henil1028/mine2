import { useState, useEffect, useMemo, useCallback } from 'react'

const MESSAGE = "This is for you my wifey"
const LETTER_APPEAR_DELAY = 80    // ms between each letter appearing
const LETTER_DISAPPEAR_DELAY = 60 // ms between each letter disappearing
const PAUSE_AFTER_COMPLETE = 1500 // ms to hold the full message
const DISAPPEAR_START_DELAY = 300 // 0.3s after complete, start disappearing

function IntroScreen({ onEnter }) {
  const [phase, setPhase] = useState('waiting')  // waiting | appearing | holding | disappearing | transitioning
  const [visibleCount, setVisibleCount] = useState(0)
  const [isFading, setIsFading] = useState(false)

  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 6,
      delay: Math.random() * 10,
      color: Math.random() > 0.4
        ? `rgba(0, 180, 255, ${Math.random() * 0.4 + 0.1})`
        : `rgba(255, 105, 180, ${Math.random() * 0.3 + 0.1})`,
    }))
  }, [])

  const handleClick = useCallback(() => {
    if (phase !== 'waiting') return
    setPhase('appearing')
    setVisibleCount(0)
  }, [phase])

  // Phase: appearing — add one letter at a time
  useEffect(() => {
    if (phase !== 'appearing') return

    if (visibleCount < MESSAGE.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1)
      }, LETTER_APPEAR_DELAY)
      return () => clearTimeout(timer)
    } else {
      // All letters visible → hold, then start disappearing
      const holdTimer = setTimeout(() => {
        setPhase('disappearing')
      }, PAUSE_AFTER_COMPLETE + DISAPPEAR_START_DELAY)
      return () => clearTimeout(holdTimer)
    }
  }, [phase, visibleCount])

  // Phase: disappearing — remove one letter at a time
  useEffect(() => {
    if (phase !== 'disappearing') return

    if (visibleCount > 0) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev - 1)
      }, LETTER_DISAPPEAR_DELAY)
      return () => clearTimeout(timer)
    } else {
      // All letters gone → transition to letter screen
      setPhase('transitioning')
      setTimeout(() => {
        setIsFading(true)
        setTimeout(() => {
          onEnter()
        }, 1500)
      }, 400)
    }
  }, [phase, visibleCount, onEnter])

  return (
    <div className={`intro-screen ${isFading ? 'fading' : ''}`} onClick={handleClick}>
      {/* Floating particles */}
      <div className="particles-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            }}
          />
        ))}
      </div>

      {/* Click prompt — only visible in waiting phase */}
      {phase === 'waiting' && (
        <div className="click-prompt">
          <div className="click-ripple" />
          <div className="click-ripple click-ripple-2" />
          <div className="click-icon">💙</div>
          <p className="click-text">Tap anywhere</p>
        </div>
      )}

      {/* Neon text animation */}
      {(phase === 'appearing' || phase === 'holding' || phase === 'disappearing') && (
        <div className="neon-text-container">
          {/* Hug emoji above */}
          <div className={`neon-emoji neon-emoji-top ${visibleCount > 0 ? 'visible' : ''}`}>
            🤗
          </div>

          {/* Main text */}
          <h1 className="neon-text" aria-label={MESSAGE}>
            {MESSAGE.split('').map((char, index) => (
              <span
                key={index}
                className={`neon-letter ${index < visibleCount ? 'visible' : 'hidden'}`}
                style={{
                  animationDelay: `${index * 0.02}s`,
                  // Alternate between pink and blue for neon effect
                  '--neon-color': index % 2 === 0
                    ? 'var(--neon-pink)'
                    : 'var(--neon-blue)',
                  '--neon-glow': index % 2 === 0
                    ? 'var(--neon-pink-glow)'
                    : 'var(--neon-blue-glow)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Blue heart emoji below */}
          <div className={`neon-emoji neon-emoji-bottom ${visibleCount >= MESSAGE.length ? 'visible' : ''}`}>
            💙
          </div>
        </div>
      )}

      {/* Transitioning overlay */}
      {phase === 'transitioning' && (
        <div className="transition-flash" />
      )}
    </div>
  )
}

export default IntroScreen
