import React, { useState, useEffect } from 'react';
import KeyChart from '../organisms/KeyChart';
import QuizOptions from '../molecules/QuizOptions';
import QuizGenerator from '../organisms/QuizGenerator';
import { keysInfo } from '../../data/KeysInfo';

type KeyData = {
  name: string;
  value: number;
  fill: string;
  sign: string;
};

type Artist = {
  id: number;
  name: string;
  keyData: KeyData[];
};

export const Quiz: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [artistOptions, setArtistOptions] = useState<Artist[]>([]);
  const [keyData, setKeyData] = useState<KeyData[]>([]);
  const [correctArtist, setCorrectArtist] = useState<Artist | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [searchResult, setSearchResult] = useState<{ 曲名: string; キー: string }[]>([]);

  const startQuiz = () => {
    setCorrectArtist(chooseRandomArtist());
    setQuizStarted(true);
    setCorrectAnswers(0);
  };

  const chooseRandomArtist = (): Artist => {
    const randomIndex = Math.floor(Math.random() * artistOptions.length);
    return artistOptions[randomIndex];
  };

  const handleFetchData = async (data: Artist[]) => {
    try {
      setLoading(true);
      setArtistOptions(data);
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
      alert('データの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerClick = async (selectedArtistName: string) => {
    if (correctArtist && selectedArtistName === correctArtist.name) {
      alert('正解です！');
      setCorrectAnswers(correctAnswers + 1);
    } else {
      alert('不正解です！');
    }

    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);

      // QuizGeneratorを都度呼び出し、ランダムなアーティストデータを更新
      const newRandomArtists = await fetchRandomArtists();
      setArtistOptions(newRandomArtists);

      // アーティストのIDを取得
      const artistId = correctArtist?.id;

      // バックエンドにアーティストのIDを渡して楽曲データを取得
      try {
        const response = await fetch(`http://localhost:8000/get_songs_by_artist/?artist_id=${artistId}`);
        const data = await response.json();
        setSearchResult(data);
      } catch (error) {
        console.error(error);
        alert('楽曲データの取得に失敗しました');
      } finally {
        setCorrectArtist(chooseRandomArtist());
      }
    } else {
      alert(`クイズ終了！ ${correctAnswers}問正解！${correctAnswers === 5 ? 'すごい！！' : ''}${correctAnswers === 0 ? '残念......' : ''}`);
      setQuizStarted(false);
      setCurrentQuestion(0);
    }
  };

  const fetchRandomArtists = async () => {
    try {
      const response = await fetch('http://localhost:8000/get_random_artists');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('データの取得に失敗しました');
        return [];
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      return [];
    }
  };

  const getKeyCount = (result: { 曲名: string; キー: string }[]) => {
    const keyCount: { [key: string]: number } = {};
    result.forEach((item: { 曲名: string; キー: string }) => {
      if (item.キー in keyCount) {
        keyCount[item.キー] += 1;
      } else {
        keyCount[item.キー] = 1;
      }
    });
    return keyCount;
  };

  const getSortedKeyData = (keyCount: { [key: string]: number }) => {
    return keysInfo.map((keyInfo) => ({
      name: keyInfo.name,
      value: keyCount[keyInfo.name] || 0,
      fill: keyInfo.color,
      sign: keyInfo.keySign
    }));
  };

  useEffect(() => {
    if (searchResult.length > 0) {
      const keyCount = getKeyCount(searchResult);
      const sortedKeyData = getSortedKeyData(keyCount);
      setKeyData(sortedKeyData);
    }
  }, [searchResult]);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold mb-6">調性クイズ</h1>
      {loading ? (
        <p>Loading...</p>
      ) : quizStarted ? (
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
          <p className="mb-6 text-center ">※ この機能は未完成です</p>
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

export default Quiz;
