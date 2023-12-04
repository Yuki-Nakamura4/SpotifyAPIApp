// Quiz.tsx
import React, { useState, useEffect } from 'react';
import KeyChart from '../organisms/KeyChart';
import QuizOptions from '../molecules/QuizOptions';
import QuizGenerator from '../organisms/QuizGenerator';

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

export const Quiz: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [artistOptions, setArtistOptions] = useState<Artist[]>([]);
  const [keyData, setKeyData] = useState<KeyData[]>([]);
  const [correctArtist, setCorrectArtist] = useState<Artist | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const startQuiz = () => {
    setCorrectArtist(chooseRandomArtist());
    setQuizStarted(true);
    setCorrectAnswers(0);
  };

  const chooseRandomArtist = (): Artist => {
    const randomIndex = Math.floor(Math.random() * artistOptions.length);
    return artistOptions[randomIndex];
  };

  const handleFetchData = (data: Artist[]) => {
    setArtistOptions(data);
    setKeyData([]);
  };

  const handleAnswerClick = (selectedArtistName: string) => {
    if (correctArtist && selectedArtistName === correctArtist.name) {
      alert('正解です！');
      setCorrectAnswers(correctAnswers + 1);
    } else {
      alert('不正解です！');
    }

    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
      setCorrectArtist(chooseRandomArtist());
    } else {
      alert(`クイズ終了！ ${correctAnswers}問正解！${correctAnswers === 5 ? 'すごい！！' : ''}${correctAnswers === 0 ? '残念......' : ''}`);
      setQuizStarted(false);
      setCurrentQuestion(0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_random_artists');
        if (response.ok) {
          const data = await response.json();
          handleFetchData(data);
        } else {
          console.error('データの取得に失敗しました');
          alert('keydataの取得に失敗しました');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        alert('keydataの取得に失敗しました');
      }
    };

    if (quizStarted) {
      fetchData();
    }
  }, [quizStarted, currentQuestion]);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold mb-6">調性クイズ</h1>
      {quizStarted ? (
        <div>
          <KeyChart keyData={keyData} />
          <QuizOptions
            key={currentQuestion}
            randomArtists={artistOptions}
            handleAnswerClick={handleAnswerClick}
            correctArtist={correctArtist}
          />
        </div>
      ) : (
        <div>
          <p className="text-center mb-4">
            表示されるグラフを元にそのアーティストが誰かを 4 択から選択してください
          </p>
          <p className="mb-6 text-center ">問題数は 5 問です</p>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={startQuiz}
            >
              START
            </button>
          </div>
          <QuizGenerator onFetchData={handleFetchData} />
        </div>
      )}
    </div>
  );
};
