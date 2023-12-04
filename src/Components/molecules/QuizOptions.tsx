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
  randomArtists: Artist[];
  handleAnswerClick: (selectedArtistName: string) => void;
};

const QuizOptions: React.FC<QuizOptionsProps> = ({ randomArtists, handleAnswerClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {randomArtists.map((artist) => (
        <QuizOptionsButton key={artist.id} artist={artist} onClick={handleAnswerClick} />
      ))}
    </div>
  );
};

export default QuizOptions;