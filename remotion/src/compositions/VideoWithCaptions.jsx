import React from "react";
import { Video, useCurrentFrame, useVideoConfig } from "remotion";
import { CaptionStyles } from "./CaptionStyles";

export const VideoWithCaptions = ({ videoSrc, captions, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Precise caption matching with buffer
  const currentCaption = captions.find((caption) => {
    const buffer = 0.1; // 100ms buffer for better UX
    return (
      currentTime >= caption.start - buffer &&
      currentTime <= caption.end + buffer
    );
  });

  return (
    <div style={{ 
      width: "100%", 
      height: "100%", 
      position: "relative", 
      backgroundColor: "black" 
    }}>
      <Video
        src={videoSrc}
        style={{ width: "100%", height: "100%" }}
        startFrom={0}
      />

      {currentCaption && (
        <CaptionStyles
          text={currentCaption.text}
          style={style}
          currentTime={currentTime}
          captionStart={currentCaption.start}
          captionEnd={currentCaption.end}
        />
      )}
    </div>
  );
};
