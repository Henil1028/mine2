import { useState, useEffect, useRef } from 'react'

const INITIAL_VIDEO_ID = 'ucmM_8yQnLI' // Tere Bin (starts at 1:05 = 65s)
const YES_VIDEO_ID = 'ZsZhpdyYUVo' // Requested song (starts at 2:18 = 138s)

function MusicPlayer({ shouldPlay, playYesSong }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const playerRef = useRef(null)
  const containerRef = useRef(null)

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer()
      return
    }

    // Load the API script
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(tag, firstScript)

    window.onYouTubeIframeAPIReady = () => {
      initPlayer()
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
    }
  }, [])

  function initPlayer() {
    playerRef.current = new window.YT.Player('yt-player', {
      videoId: INITIAL_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        loop: 1,
        start: 65, // Start at 1:05
        playlist: INITIAL_VIDEO_ID, // Required for loop to work
      },
      events: {
        onReady: (event) => {
          event.target.setVolume(60)
          setPlayerReady(true)
        },
        onStateChange: (event) => {
          // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
          if (event.data === 1) {
            setIsPlaying(true)
          } else if (event.data === 2 || event.data === 0) {
            setIsPlaying(false)
          }
        },
      },
    })
  }

  // Auto-play when shouldPlay becomes true
  useEffect(() => {
    if (shouldPlay && playerReady && playerRef.current && !playYesSong) {
      try {
        playerRef.current.playVideo()
      } catch (err) {
        console.log('YouTube play error:', err)
      }
    }
  }, [shouldPlay, playerReady, playYesSong])

  // Switch to YES song at 2:18 (138s) when YES is clicked
  useEffect(() => {
    if (playYesSong && playerReady && playerRef.current) {
      try {
        playerRef.current.loadVideoById({
          videoId: YES_VIDEO_ID,
          startSeconds: 138,
        })
        playerRef.current.playVideo()
      } catch (err) {
        console.log('Error playing YES song:', err)
      }
    }
  }, [playYesSong, playerReady])

  const toggleMusic = () => {
    if (!playerRef.current || !playerReady) return

    try {
      const state = playerRef.current.getPlayerState()
      if (state === 1) {
        // Playing → Pause
        playerRef.current.pauseVideo()
      } else {
        // Paused/Ended → Play
        playerRef.current.playVideo()
      }
    } catch (err) {
      console.error('Toggle error:', err)
    }
  }

  return (
    <>
      {/* Hidden YouTube player */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          width: '1px',
          height: '1px',
          top: '-100px',
          left: '-100px',
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div id="yt-player" />
      </div>

      {/* Visible music toggle button */}
      <button
        className="music-control"
        onClick={toggleMusic}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
        id="music-toggle"
      >
        <div className="music-bars">
          <div className={`music-bar ${isPlaying ? 'playing' : 'paused'}`} />
          <div className={`music-bar ${isPlaying ? 'playing' : 'paused'}`} />
          <div className={`music-bar ${isPlaying ? 'playing' : 'paused'}`} />
          <div className={`music-bar ${isPlaying ? 'playing' : 'paused'}`} />
        </div>
      </button>
    </>
  )
}

export default MusicPlayer
