
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioManager = () => {
  const [isMuted, setIsMuted] = useState(true);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio elements
    backgroundAudioRef.current = new Audio('/sounds/ambient-background.mp3');
    hoverSoundRef.current = new Audio('/sounds/hover.mp3');
    clickSoundRef.current = new Audio('/sounds/click.mp3');
    
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.loop = true;
      backgroundAudioRef.current.volume = 0.3;
    }
    
    if (hoverSoundRef.current) {
      hoverSoundRef.current.volume = 0.2;
    }
    
    if (clickSoundRef.current) {
      clickSoundRef.current.volume = 0.4;
    }
    
    // Ensure audio is muted initially
    setMuteState(true);
    
    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
      }
    };
  }, []);
  
  const setMuteState = (muted: boolean) => {
    setIsMuted(muted);
    
    if (backgroundAudioRef.current) {
      if (muted) {
        backgroundAudioRef.current.pause();
      } else {
        backgroundAudioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      }
    }
  };
  
  const toggleMute = () => {
    setMuteState(!isMuted);
    playClickSound();
  };
  
  const playHoverSound = () => {
    if (!isMuted && hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(err => {
        console.log('Hover sound play failed:', err);
      });
    }
  };
  
  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(err => {
        console.log('Click sound play failed:', err);
      });
    }
  };
  
  // Expose sound functions globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).playHoverSound = playHoverSound;
      (window as any).playClickSound = playClickSound;
    }
    
    // Add event listeners to elements for sound effects
    const buttons = document.querySelectorAll('button, a');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', playHoverSound);
      button.addEventListener('click', playClickSound);
    });
    
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', playHoverSound);
        button.removeEventListener('click', playClickSound);
      });
    };
  }, [isMuted]);

  return (
    <button 
      className="sound-button"
      onClick={toggleMute}
      aria-label={isMuted ? "Enable sound" : "Disable sound"}
    >
      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
};

export default AudioManager;
