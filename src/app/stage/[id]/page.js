'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const stages = {
    '1': {
        title: 'Stage 1: Prehistoric Earth, 65 Million BCE',
        description: 'You’ve traveled back to the age of dinosaurs! Massive creatures roam the land, and the air is thick with ancient flora. But wait—something here is definitely not from this era. Look closely and tell me what you find before one of these dinosaurs spots us!',
        clue: 'This object would normally help a human explore the stars, not a dinosaur.',
        answer: 'telescope',
        image: '/Prehistoric_Earth.png',
        audio: '/stage1.mp3'
    },
    '2': {
        title: 'Stage 2: Ancient Egypt, 2500 BCE',
        description: 'Here we are in Ancient Egypt. This is a temple filled with towering columns covered in hieroglyphs. Sunlight streams through, casting intricate patterns on the stone floor. But wait—there’s something that doesn’t belong here. I’m certain I’ve seen it before… in our time. Look carefully and tell me what you find.',
        clue: 'In a world of fire and sun, one symbol is far ahead of its time, yet shines like Ra himself. Name it.',
        answer: 'lightbulb',
        image: '/Ancient_Egypt.png',
        audio: '/stage2.mp3'
    },
    '3': {
        title: 'Stage 3: Ancient Greece, 500 BCE',
        description: 'Welcome to Ancient Greece! You’re standing in a grand hall filled with marble columns and beautiful artwork adorning the walls. Scholars and philosophers are gathered in small groups, deep in discussion, surrounded by scrolls and books. But something here is out of place—an object that clearly doesn’t belong in this age. Get it before they start to analyze it!',
        clue: 'This object is common in our time but would confuse anyone in Ancient Greece. It connects people across distances in ways these scholars couldn’t imagine.',
        answer: 'phone',
        image: '/Ancient_Greece.png',
        audio: '/stage3.mp3'
    },
    '4': {
        title: 'Stage 4: Viking Longship, 900 CE',
        description: 'You’ve boarded a Viking longship sailing through icy waters! Warriors are shouting, oars are splashing, and the scent of salt fills the air. But amidst the shields and weapons, there’s something that doesn’t belong. Hurry and find it before these fierce raiders notice!',
        clue: 'This object belongs on a grassy field, not on the deck of a ship. It rolls through time, defying the waves.',
        answer: 'soccer ball',
        image: '/Viking_Longship.jpeg',
        audio: '/stage4.mp3'
    },
    '5': {
        title: 'Stage 5: Medieval Europe, 1215 CE',
        description: 'Oh no, you’ve landed in the middle of an active battlefield! Knights in armor are charging, swords are clashing, and banners are flying in the wind. Quickly, there’s something here that doesn’t belong—an object from far in the future. Find it and grab it before we get skewered!',
        clue: 'This symbol represents a nation that hasn’t been founded yet. Look for it among the banners.',
        answer: 'American flag',
        image: '/Medieval_Battlefield.png',
        audio: '/stage5.mp3'
    },
    '6': {
      title: 'Stage 6: Feudal Japan, 1600 CE',
      description: 'Looks like you’ve landed in Feudal Japan! You’re in a stunning courtyard with bamboo swaying in the breeze and ornate wooden structures framing the space. A leader presides at the center, surrounded by attentive samurai seated in perfect stillness. Everything seems steeped in tradition—except for an anomaly that doesn’t belong here. Quick, identify it before anyone notices!',
      clue: 'This advanced object draws energy from the sun and has no place in this historical setting.',
      answer: 'solar panel',
      image: '/Feudal_Japan.png',
      audio: '/stage6.mp3'
    },
    '7': {
    title: 'Stage 7: Mozart’s First Concert, 1762 CE',
    description: 'Yikes! There\'s a concert going on, so I have to communicate via text only. Looks like you\'re at a grand concert hall in 18th-century Austria! The young prodigy Wolfgang Amadeus Mozart is captivating an audience of nobles with his harpsichord skills. Chandeliers glitter above, and the sound of classical music fills the air. But wait—there’s something here that doesn’t belong. It’s an object from our time, sitting conspicuously among the elegant scene. Quickly, find it before someone notices!',
    clue: 'This object silences all sound, making it rather useless at a concert. It\'ts a wonder they haven\'t realized it\'s over their ears, they must be sleeping!',
    answer: 'headphones',
    image: '/Mozart_Concert.png',
    audio: '/AI_Mozart.wav'
    },
    '8': {
    title: 'Stage 8: Eiffel Tower Reveal, 1889 CE',
    description: 'Bienvenue à Paris! You’ve arrived at the grand unveiling of the Eiffel Tower during the 1889 World’s Fair. The excitement is palpable as crowds of Parisians and tourists marvel at this towering iron structure, the tallest in the world at the time. But amidst the chatter and celebration, there’s something here that doesn’t belong—an object that’s too modern for this historic moment. Quickly, find it before it creates a scandal!',
    clue: 'This object can fly but has no wings. It captures moments from the sky.',
    answer: 'drone',
    image: '/Eiffel_Tower_Reveal.png',
    audio: '/stage8.mp3'
    },
    '9': {
    title: 'Stage 9: Moon Landing, 1969 CE',
    description: 'You’ve arrived at the Moon Landing, one of history’s most iconic moments. The gray lunar surface stretches before you, with the American flag nearby and astronauts hard at work. But wait—something futuristic gleams in the dust. A VR headset? Microsoft? Meta? You need to grab it fast before your oxygen runs out!',
    clue: 'This futuristic device blends reality with the virtual world whose company is known for its fruit logo.',
    answer: 'Apple Vision Pro',
    image: '/Moon_Landing.png',
    audio: '/stage9.mp3'
    },
    
};

const successMessages = [
    "You got it! Let's move on!",
    "Great job! On to the next stage!",
    "Correct! Let’s continue.",
    "Nice work! Ready for the next one?",
    "Excellent! Let's see what's next.",
    "Well done, traveler! Time awaits.",
    "You’ve set history straight! Let’s keep going.",
    "Brilliant! Time is aligning once more.",
    "You’ve uncovered the anomaly! Let's fix the next one.",
    "Fantastic work! The timeline is stabilizing.",
    "You're a natural at this! Forward to the next era!",
    "Impressive! The timeline is grateful.",
    "You’ve cracked it! Let’s keep history intact.",
    "Superb! Onward to the next challenge in time.",
    "Perfect! Another era restored. Let’s move on."
];

export default function StagePage() {
  const params = useParams();
  const router = useRouter();
  const stageId = params.id;
  const stageData = stages[stageId];

  const [isMinimized, setIsMinimized] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const audioRef = useRef(null);

  useEffect(() => {
      if (audioRef.current && stageData.audio) {
          audioRef.current.play();
      }
  }, [stageData]);

  const handleToggle = () => {
      setIsMinimized((prev) => !prev);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (answer.toLowerCase().trim() === stageData.answer.toLowerCase()) {
          setIsCorrect(true);
          setShowError(false);
          setSuccessMessage(successMessages[Math.floor(Math.random() * successMessages.length)]);
      } else {
          setShowError(true);
      }
  };

  const handleNextStage = () => {
      const nextStageId = parseInt(stageId) + 1;
      if (stages[nextStageId.toString()]) {
          router.push(`/stage/${nextStageId}`);
      } else {
          router.push('/completion');
      }
  };

  return (
      <div className="relative min-h-screen bg-black">
          {/* Full-screen image */}
          <Image
              src={stageData.image}
              alt={stageData.title}
              layout="fill"
              objectFit="cover"
              className="absolute z-0"
          />

          {/* Audio Player */}
          <audio ref={audioRef} src={stageData.audio} preload="auto" />

          {/* Overlay Content */}
          <div
              className={`absolute inset-0 z-10 transition-all ${
                  isMinimized ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
          >
              <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-70 p-8">
                  <h2
                      className="text-3xl font-bold mb-6 text-center"
                      style={{ color: 'rgb(239, 202, 87)' }} // Title color
                  >
                      {stageData.title}
                  </h2>
                  <p
                      className="text-lg mb-4 max-w-lg text-center"
                      style={{ color: 'rgb(87, 235, 255)' }} // Description color
                  >
                      {stageData.description}
                  </p>

                  {!showHint ? (
                      <button
                          onClick={() => setShowHint(true)}
                          className="px-4 py-2 mb-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
                      >
                          Show Hint
                      </button>
                  ) : (
                      <p className="text-lg mb-8 max-w-lg text-center font-semibold">
                          Hint: {stageData.clue}
                      </p>
                  )}

                  {!isCorrect ? (
                      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                          <input
                              type="text"
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              placeholder="Enter your answer"
                              className="px-4 py-2 rounded bg-gray-600 text-white placeholder-gray-400 border border-gray-500"
                          />
                          <button
                              type="submit"
                              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded text-white font-bold"
                          >
                              Submit Answer
                          </button>
                          {showError && (
                              <p className="text-red-400 mt-2">Incorrect answer. Try again!</p>
                          )}
                      </form>
                  ) : (
                      <>
                          <p className="text-lg font-semibold text-green-400 mt-4">
                              {successMessage}
                          </p>
                          <button
                              onClick={handleNextStage}
                              className="px-6 py-3 mt-4 bg-green-600 hover:bg-green-700 rounded text-white font-bold"
                          >
                              Next Stage
                          </button>
                      </>
                  )}
              </div>
          </div>

          {/* Minimize/Expand Button */}
          <button
              onClick={handleToggle}
              className="absolute top-4 right-4 z-20 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
              {isMinimized ? 'Expand' : 'Minimize'}
          </button>
      </div>
  );
}