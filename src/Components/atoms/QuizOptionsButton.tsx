import React from 'react';

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

type Artist = {
  id: number;
  name: string;
  keyData: KeyData[];
};

type QuizOptionsButtonProps = {
  artist: Artist;
  onClick: (name: string) => void;
};

export const QuizOptionsButton: React.FC<QuizOptionsButtonProps> = ({ artist, onClick }) => {
  return (
    <button
      key={artist.id}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      onClick={() => onClick(artist.name)}
    >
      {artist.name}
    </button>
  );
};