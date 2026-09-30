import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Initialize Web Audio ambient cafe soundscape (gentle warm tape hiss + coffee lounge hum)
  const toggleSoundscape = () => {
    if (isPlaying) {
      // Stop
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      // Start
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioContextRef.current) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;

          // Generate 2 seconds of filtered warm ambient coffeehouse vinyl hum
          const bufferSize = ctx.sampleRate * 2;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          let lastOut = 0.0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            // Warm pink noise filtering
            data[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = data[i];
            data[i] *= 0.15; // gentle ambient level
          }

          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          noise.loop = true;

          // Low-pass filter for cozy muffled warm coffee atmosphere
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNodeRef.current = gain;

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          noise.start();
          noiseSourceRef.current = noise;
        }

        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }

        setIsPlaying(true);
      } catch {
        // Fallback gracefully
        setIsPlaying(!isPlaying);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSoundscape}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
        isPlaying 
          ? 'bg-[#d49b5b] text-[#100e0d] ring-2 ring-[#f8bb78]/50 shadow-[#d49b5b]/30' 
          : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white hover:bg-[#2c2928]'
      }`}
      title="Toggle The Local Coffee Ambient Soundscape"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#100e0d] animate-pulse" />
          <span className="font-semibold tracking-wide">Sound of Coffee: On</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#100e0d] animate-ping" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#f8bb78]" />
          <span>Sound of Coffee</span>
        </>
      )}
    </button>
  );
};
