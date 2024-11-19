import Link from 'next/link';

export default function TitlePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/hourglass.jpeg')", // Background image
        backgroundSize: 'cover', // Ensures the image covers the whole background
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from tiling
      }}
    >
      {/* Background box for the title and subtitle */}
      <div
        className="text-center p-6 rounded-lg mb-8"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          backdropFilter: 'blur(5px)', // Optional blur effect for a glassy look
        }}
      >
        <h1
          className="text-5xl font-bold mb-4"
          style={{
            color: 'rgb(239, 202, 87)', // Golden color for the title
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Subtle shadow for contrast
          }}
        >
          Lost in Time
        </h1>
        <p
          className="text-xl"
          style={{
            color: 'rgb(239, 202, 87)', // Golden color for the subtitle
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Subtle shadow for contrast
          }}
        >
          A Time Traveler's Quest
        </p>
      </div>
      <Link href="/introduction">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold">
          Start
        </button>
      </Link>
    </div>
  );
}
