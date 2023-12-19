// QuizOptions.tsx
import React from 'react';
import QuizOptionsButton from '../atoms/QuizOptionsButton';

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

type Artist = {
  id: number;
  name: string;
  keyData: KeyData[]; // keyDataプロパティを追加
};

type QuizOptionsProps = {
  randomArtists: Artist[];
  handleAnswerClick: (selectedArtistName: string) => void;
  correctArtist: Artist | null; // 追加: 正解のアーティストを受け取る
}

const QuizOptions: React.FC<QuizOptionsProps> = ({ randomArtists, handleAnswerClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {randomArtists.map((artist) => (
        // keyDataを渡す
        <QuizOptionsButton key={artist.id} artist={artist} onClick={handleAnswerClick} />
      ))}
    </div>
  );
};

export default QuizOptions;
