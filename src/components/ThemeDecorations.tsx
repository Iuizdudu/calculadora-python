import React from 'react';

/**
 * Clean vector SVG Witch Hat tilted on the top-left corner of the calculator,
 * designed for the Halloween theme.
 */
export const WitchHat: React.FC = () => {
  return (
    <div
      className="absolute -top-7 -left-5 z-20 pointer-events-none transform -rotate-15 filter drop-shadow-md transition-all duration-300"
      style={{ width: '64px', height: '54px' }}
      title="Chapéu de Bruxa (Halloween)"
    >
      <svg
        viewBox="0 0 100 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Hat Cone / Body */}
        <path
          d="M 50 4 C 42 22 28 48 18 64 L 82 64 C 72 48 58 22 50 4 Z"
          fill="#1c0b2b"
          stroke="#0d0414"
          strokeWidth="2.5"
        />
        {/* Curved Top Tip */}
        <path
          d="M 50 4 Q 53 1 58 6 Q 52 8 50 4"
          fill="#1c0b2b"
        />
        {/* Hat Belt (Orange Halloween Accent) */}
        <path
          d="M 21 57 L 79 57 L 82 64 L 18 64 Z"
          fill="#ea580c"
          stroke="#c2410c"
          strokeWidth="1"
        />
        {/* Belt Buckle (Gold) */}
        <rect
          x="44"
          y="56"
          width="12"
          height="8"
          rx="1.5"
          fill="#f59e0b"
          stroke="#b45309"
          strokeWidth="1.2"
        />
        <rect
          x="47"
          y="58"
          width="6"
          height="4"
          rx="0.8"
          fill="#1c0b2b"
        />
        {/* Hat Brim / Base (Oval) */}
        <ellipse
          cx="50"
          cy="66"
          rx="44"
          ry="12"
          fill="#130620"
          stroke="#0d0414"
          strokeWidth="2"
        />
        {/* Subtle Highlight */}
        <path
          d="M 47 16 C 43 28 36 46 32 55"
          stroke="#9333ea"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

/**
 * Clean vector SVG Pointy Cat Ears sitting directly at the top left & top right edges
 * of the calculator chassis for the Gatos theme.
 */
export const CatEars: React.FC = () => {
  return (
    <div className="absolute -top-5 left-0 right-0 flex justify-between px-6 pointer-events-none z-20">
      {/* Left Pointy Ear */}
      <div className="w-9 h-7 transform -rotate-10 filter drop-shadow-xs">
        <svg viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer Ear */}
          <path
            d="M 4 33 C 8 20 18 5 22 2 C 26 12 34 24 38 33 Z"
            fill="#fbcfe8"
            stroke="#f472b6"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Inner Ear (Rose Pink) */}
          <path
            d="M 12 30 C 14 20 20 10 22 8 C 24 15 28 22 30 30 Z"
            fill="#f43f5e"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Right Pointy Ear */}
      <div className="w-9 h-7 transform rotate-10 filter drop-shadow-xs">
        <svg viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer Ear */}
          <path
            d="M 2 33 C 6 24 14 12 18 2 C 22 5 32 20 36 33 Z"
            fill="#fbcfe8"
            stroke="#f472b6"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Inner Ear (Rose Pink) */}
          <path
            d="M 10 30 C 12 22 16 15 18 8 C 20 10 26 20 28 30 Z"
            fill="#f43f5e"
            opacity="0.85"
          />
        </svg>
      </div>
    </div>
  );
};
