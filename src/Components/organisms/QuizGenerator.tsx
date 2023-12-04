import React, { useEffect, useState } from 'react';
import QuizOptions from '../molecules/QuizOptions';

type Artist = {
  name: string;
  id: string;
}

const QuizGenerator: React.FC = () => {
  const [randomArtists, setRandomArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_random_artists');
        if (response.ok) {
          const data = await response.json();
          setRandomArtists(data);
        } else {
          console.error('データの取得に失敗しました');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {randomArtists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizGenerator;