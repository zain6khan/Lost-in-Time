'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function IntroductionPage() {
  useEffect(() => {
    // Play background audio when the page loads
    const audio = new Audio('/introduction.mp3'); // Replace with your audio file
    audio.loop = false; // Make the audio loop
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset audio when the component unmounts
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/futuristic_watch.jpeg')", // Replace with your screen-like image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Screen-like container for the text */}
      <div
        className="p-8 rounded-lg shadow-lg"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black
          backdropFilter: 'blur(5px)', // Blur effect for glassy look
          border: '2px solid rgba(239, 202, 87, 0.8)', // Golden border
          boxShadow: '0 0 20px rgba(239, 202, 87, 0.5)', // Glowing effect
          maxWidth: '800px', // Restrict width
          width: '90%', // Responsive width
        }}
      >
        <h2
          className="text-4xl font-bold mb-6 text-center"
          style={{
            color: 'rgb(239, 202, 87)', // Golden color
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Shadow for contrast
          }}
        >
          Message from the Time Traveler
        </h2>
        <p
          className="text-lg mb-4 text-center"
          style={{
            color: 'rgb(87,235,255)', // Light blue color for Time Traveler's text
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)', // Subtle text shadow
          }}
        >
          Greetings, brave soul! I am the Time Traveler, sending this message from the year 2184. My experiments with temporal mechanics caused unintended consequences—I’ve disrupted the timeline, sending objects and symbols into eras where they don’t belong.
        </p>
        <p
          className="text-lg mb-4 text-center"
          style={{
            color: 'rgb(87,235,255)', // Light blue color for Time Traveler's text
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)', // Subtle text shadow
          }}
        >
          Using advanced quantum tunneling technology, I managed to send this special device to you in 2024. Even though I can't be there myself, his wearable device will allow us to communicate across time and enable you to travel to different historical moments.        </p>
        <p
          className="text-lg mb-8 text-center"
          style={{
            color: 'rgb(87,235,255)', // Light blue color for Time Traveler's text
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)', // Subtle text shadow
          }}
        >
          Each stage will transport you to a unique time period. I’ll describe what you should see and guide you in identifying anomalies. If we can locate these objects and restore the timeline, we’ll prevent irreversible damage to history. I need your courage and quick thinking—are you ready for this journey?
        </p>
        <Link href="/stage/1">
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white font-bold w-full">
            Begin the Adventure
          </button>
        </Link>
      </div>
    </div>
  );
}
