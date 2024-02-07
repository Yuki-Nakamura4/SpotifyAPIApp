import { useState, useEffect } from 'react';

type ArtistData = {
    id: string;
    name: string;
};

export const useFetchArtistData = (searchQuery: string) => {
  const [artistData, setArtistData] = useState<ArtistData[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchArtistData = async () => {
      if (searchQuery !== '') {
        try {
          const response = await fetch(`http://localhost:8000/get_artists_name/?artist=${searchQuery}`);
          const data = await response.json();
          setArtistData(data);
        } catch (error) {
          console.error(error);
          setErrorMessage('データの取得に失敗しました');
        }
      } else {
        setArtistData([]);
      }
    };
    fetchArtistData();
  }, [searchQuery]);

  return { artistData, errorMessage };
};