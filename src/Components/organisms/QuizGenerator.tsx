// QuizGenerator.tsx
import React, { useEffect, useState } from 'react';

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

interface QuizGeneratorProps {
  onFetchData: (data: Artist[]) => void;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ onFetchData }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_random_artists');
        if (response.ok) {
          const data = await response.json();
          onFetchData(data);
        } else {
          console.error('データの取得に失敗しました');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData();
  }, [onFetchData]);

  // QuizGeneratorコンポーネントでは何も返さなくてもよい
  return null;
};

export default QuizGenerator;
