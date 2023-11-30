import React, { useState, useEffect } from 'react';
import KeyChart from '../organisms/KeyChart';
import { getRandomArtists } from '../organisms/RandomArtistAPI';

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

// アーティストのデータを型付け
interface Artist {
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
    const randomArtistName = getRandomArtists();
    // 仮のデータを設定しています。適切なデータを取得する必要があります。
    const randomArtist: Artist = {
      id: 1, // 仮の値、実際のプロジェクトでは適切な値を設定してください
      name: randomArtistName,
      keyData: [
        { name: 'C', value: 1, fill: '#FF5733' },
        { name: 'D', value: 2, fill: '#33FF57' },
        // 他のデータも追加
      ],
    };
    setShuffledArtists([randomArtist]);
    setKeyData([]); // クイズが始まるたびに keyData をリセット
  };

  const shuffleArray = (array: Artist[]): Artist[] => {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  const handleAnswerClick = (selectedArtistName: string) => {
    if (selectedArtistName === shuffledArtists[currentQuestion].name) {
      alert('正解です！');
      // 正解の場合、keyData に対応するアーティストの keyData をセット
      setKeyData(shuffledArtists[currentQuestion].keyData);
    } else {
      alert('不正解です！');
    }

    // 次の問題に進む
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // クイズが完了した場合、ここでクイズの終了処理を行います
      alert('クイズ終了！');
      setQuizStarted(false);
      setCurrentQuestion(0);
    }
  };

  useEffect(() => {
    // 必要に応じて追加のデータの取得や初期化処理を行います
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold mb-4">調性クイズ</h1>
      {quizStarted ? (
        <div>
          {/* 現在の問題のための keychart を描画 */}
          <KeyChart keyData={keyData} />
          {/* 回答オプションを描画 */}
          <div className="flex flex-col items-center">
            {shuffledArtists.map((artist) => (
            <>
              <button
                key={artist.id}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-2"
                onClick={() => handleAnswerClick(artist.name)}
              >
                {artist.name}
              </button>
              <button
              key={artist.id}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
              onClick={() => handleAnswerClick(artist.name)}
            >
              {artist.name}
            </button>
            <button
            key={artist.id}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={() => handleAnswerClick(artist.name)}
          >
            {artist.name}
          </button>
          <button
          key={artist.id}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={() => handleAnswerClick(artist.name)}
        >
          {artist.name}
        </button>
        </>
            ))}
          </div>
        </div>
        
      ) : (
        <div>
          <p className="text-center mb-4">
            表示されるグラフを元にそのアーティストが誰かを 4 択から選択してください
          </p>
          <p className="mb-4 text-center ">問題数は 5 問です</p>
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
