import { useState } from 'react';

type Config = {
  src: string;
  loop?: boolean;
};

export function useAudio({ src }: Config) {
  const [audio, setAudio] = useState(new Audio(src));

  audio.autoplay = true;
  audio.muted = false;

  const play = () => audio.play();
  const pause = () => audio.pause();

  return {
    audio,
    play,
    pause,
  };
}
