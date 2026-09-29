import { useState } from 'react'
import IntroScreen from './components/IntroScreen.jsx'
import LetterScreen from './components/LetterScreen.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'

function App() {
  const [showLetter, setShowLetter] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const [playYesSong, setPlayYesSong] = useState(false)

  const handleEnter = () => {
    setMusicStarted(true)
    setTimeout(() => {
      setShowLetter(true)
    }, 800)
  }

  const handleYes = () => {
    setPlayYesSong(true)
  }

  return (
    <>
      {!showLetter && <IntroScreen onEnter={handleEnter} />}
      {showLetter && <LetterScreen onYes={handleYes} />}
      <MusicPlayer shouldPlay={musicStarted} playYesSong={playYesSong} />
    </>
  )
}

export default App
