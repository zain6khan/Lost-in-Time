'use client';

import { useEffect, useRef } from 'react';

export default function CompletionPage() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize the audio object if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio('/stages_complete.mp3');
      audioRef.current.loop = false; // No looping for completion audio
      audioRef.current.preload = 'auto'; // Preload audio for better performance
    }

    // Attempt to play the audio
    const playAudio = async () => {
      try {
        const playPromise = audioRef.current.play();

        // Handle the play promise
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Completion audio playback started successfully');
        }
      } catch (err) {
        console.log('Audio playback failed:', err);
        // Optional: Provide user feedback or fallback behavior here
      }
    };

    playAudio();

    // Cleanup on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset audio when unmounting
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-8"
      style={{
        backgroundImage: "url('/hourglass.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Text content with golden color */}
      <div className="relative z-10 flex flex-col items-center text-center bg-black bg-opacity-50 p-8 rounded-lg max-w-4xl">
        <h1
          className="text-5xl font-bold mb-6"
          style={{
            color: 'rgb(239, 202, 87)', // Golden text color
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Subtle shadow for contrast
          }}
        >
          Thank You, Traveler!
        </h1>
        <p
          className="text-lg mb-6"
          style={{
            color: 'rgb(87, 235, 255)', // Light blue text color
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Subtle shadow for contrast
          }}
        >
          I can’t thank you enough for your bravery and quick thinking. Together, we’ve repaired the timeline and set history back on its rightful course. From the prehistoric past to the vast expanse of the Moon, your determination has saved countless futures—including my own. You’ve proven yourself as an exceptional ally across the ages. Now that the timeline is restored, the anomalies have vanished, and we can finally move forward into a stable future. It’s been an honor sharing this journey with you. See you in the future!
        </p>
        <button
          onClick={() => (window.location.href = '/')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
