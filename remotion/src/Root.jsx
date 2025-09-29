import React from 'react';
import { Composition } from 'remotion';
import { VideoWithCaptions } from './compositions/VideoWithCaptions';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="VideoWithCaptions"
        component={VideoWithCaptions}
        durationInFrames={3000} // 100 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoSrc: '',
          captions: [],
          style: 'bottom-centered'
        }}
      />
    </>
  );
};