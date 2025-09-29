import React from 'react';

export const CaptionStyles = ({ text, style, currentTime, captionStart, captionEnd }) => {
  const fontFamily = '"Noto Sans Devanagari", "Noto Sans", "Arial Unicode MS", "Arial", sans-serif';
  
  const baseStyle = {
    position: 'absolute',
    fontFamily: fontFamily,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
    color: 'white',
    fontSize: '48px',
    lineHeight: '1.2',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '90%',
    wordWrap: 'break-word'
  };

  const getStyleConfig = () => {
    switch (style) {
      case 'top-bar':
        return {
          ...baseStyle,
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          fontSize: '40px',
          width: '90%',
          border: '2px solid #fff'
        };
      
      case 'karaoke':
        return {
          ...baseStyle,
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          fontSize: '46px',
          border: '3px solid #fff',
          animation: 'pulse 0.5s ease-in-out'
        };
      
      case 'bottom-centered':
      default:
        return {
          ...baseStyle,
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          fontSize: '46px',
          border: '2px solid #fff'
        };
    }
  };

  return (
    <div style={getStyleConfig()}>
      {text}
    </div>
  );
};