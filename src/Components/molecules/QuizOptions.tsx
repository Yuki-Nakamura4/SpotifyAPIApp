import React from 'react';
import QuizOptionsButton from '../atoms/QuizOptionsButton';

type Artist = {
  id: number;
  name: string;
  keyData: KeyData[];
};

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

type QuizOptionsProps = {
  shuffledArtists: Artist[];
  handleAnswerClick: (selectedArtistName: string) => void;
};

const QuizOptions: React.FC<QuizOptionsProps> = ({ shuffledArtists, handleAnswerClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {shuffledArtists.map((artist) => (
        <QuizOptionsButton key={artist.id} artist={artist} onClick={handleAnswerClick} />
      ))}
    </div>
  );
};

export default QuizOptions;