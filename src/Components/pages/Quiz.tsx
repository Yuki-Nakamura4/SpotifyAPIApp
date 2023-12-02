import React, { useState, useEffect } from 'react';
import KeyChart from '../organisms/KeyChart';
import { getRandomArtists } from '../organisms/RandomArtistAPI';
import QuizOptions from '../molecules/QuizOptions';

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

type Artist  ={
  id: number;
  name: string;
  keyData: KeyData[];
}

export const Quiz: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledArtists, setShuffledArtists] = useState<Artist[]>([]);
  const [keyData, setKeyData] = useState<KeyData[]>([]);

  const startQuiz = () => {
    setQuizStarted(true);
    const randomArtists: Artist[] = Array.from({ length: 4 }, (_, index) => {
        const randomArtistName = getRandomArtists();
        return {
          id: index + 1,
          name: randomArtistName,
          keyData: [
            { name: 'C', value: 1, fill: '#FF5733' },
            { name: 'D', value: 2, fill: '#33FF57' },
            { name: 'E', value: 3, fill: '#5733FF' },
            { name: 'F', value: 4, fill: '#FF5733' },
            { name: 'G', value: 5, fill: '#33FF57' },
            { name: 'A', value: 6, fill: '#5733FF' },
            { name: 'B', value: 7, fill: '#FF5733' },
            // 他のデータも追加
          ],
        };
      });
    setShuffledArtists(randomArtists);
    setKeyData([]); // クイズが始まるたびに keyData をリセット
  };

  const handleAnswerClick = (selectedArtistName: string) => {
    if (selectedArtistName === shuffledArtists[currentQuestion].name) {
      alert('正解です！');
    } else {
      alert('不正解です！');
    }

    // 次の問題に進む
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // クイズが完了した場合、ここでクイズの終了処理を行う
      alert('クイズ終了！');
      setQuizStarted(false);
      setCurrentQuestion(0);
    }
  };

  useEffect(() => {
    // 必要に応じて追加のデータの取得や初期化処理を行う
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold mb-6">調性クイズ</h1>
      {quizStarted ? (
        <div>
          {/* 現在の問題のための keychart を描画 */}
          <KeyChart keyData={keyData} />
          {/* 回答オプションを描画 */}
          <QuizOptions shuffledArtists={shuffledArtists} handleAnswerClick={handleAnswerClick} />
        </div>
        
      ) : (
        <div>
          <p className="text-center mb-4">
            表示されるグラフを元にそのアーティストが誰かを 4 択から選択してください
          </p>
          <p className="mb-6 text-center ">問題数は 5 問です</p>
          <div className="flex justify-center">
          <button
            className=" bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startQuiz}
          >
            START
          </button>
          </div>
        </div>
      )}
    </div>
  );
};
