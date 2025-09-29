import React, { useState, useRef, useEffect } from 'react';

// Simple Karaoke word highlighting component
const KaraokeText = ({ text, currentTime, captionStart, captionEnd }) => {
  const words = text.split(' ');
  const captionDuration = captionEnd - captionStart;
  const timeIntoCaption = currentTime - captionStart;
  const progressRatio = Math.max(0, Math.min(1, timeIntoCaption / captionDuration));
  
  // Calculate which words should be highlighted
  const wordsToHighlight = Math.floor(progressRatio * words.length);
  
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' }}>
      {words.map((word, index) => {
        const isHighlighted = index < wordsToHighlight;
        
        return (
          <span
            key={index}
            style={{
              color: isHighlighted ? '#FFD700' : 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              fontWeight: 'bold',
              display: 'inline-block',
              transition: 'color 0.3s ease',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

const CaptionPreview = ({ videoUrl, captions, style }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  // Update current time from video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoUrl]);

  // Find current caption
  const getCurrentCaption = () => {
    return captions.find(caption => 
      currentTime >= caption.start && currentTime <= caption.end
    );
  };

  const currentCaption = getCurrentCaption();

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full"
        style={{ maxHeight: '400px' }}
      />
      
      {/* Caption Overlay */}
      {currentCaption && (
        <div 
          className={`absolute px-4 py-2 rounded text-white font-bold text-center max-w-[90%] ${
            style === 'bottom-centered' ? 'bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70' :
            style === 'top-bar' ? 'top-0 left-0 w-full bg-black/90 rounded-none' :
            style === 'karaoke' ? 'bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600/80' :
            'bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70'
          }`}
          style={{ 
            fontFamily: '"Noto Sans Devanagari", "Noto Sans", Arial, sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            fontSize: '16px',
            lineHeight: '1.2'
          }}
        >
          {style === 'karaoke' ? (
            <KaraokeText 
              text={currentCaption.text}
              currentTime={currentTime}
              captionStart={currentCaption.start}
              captionEnd={currentCaption.end}
            />
          ) : (
            currentCaption.text
          )}
        </div>
      )}
    </div>
  );
};

export default CaptionPreview;