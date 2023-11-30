import React, { useState, useEffect, useMemo } from 'react';
import KeyChart from '../organisms/KeyChart';
import {KeyDataList} from '../organisms/KeyDataList';
import ResultTable from '../organisms/ResultTable';
import { SearchBar } from '../molecules/SearchBar';

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

export const Top: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<{ 曲名: string; キー: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [keyData, setKeyData] = useState<KeyData[]>([]);
  const [artistData, setArtistData] = useState<{ name: string; id: string }[]>([]);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const KeysOrder = useMemo(() => ["C/Am", "G/Em", "D/Bm", "A/F♯m", "E/C♯m", "B/G♯m", "G♭/D♯m", "D♭/B♭m", "A♭/Fm", "E♭/Cm", "B♭/Gm", "F/Dm"], []);

  const keyColors: string[] = [
    '#fff8ff', '#00CEFF', '#FFFF8A', '#FF596D', '#00FF7E', '#FFC88A',
    '#BB62FF', '#D4FFF6', '#4F5EFF', '#00B5D4', '#ECEBEC', '#FFF8D8',
  ];

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
    return KeysOrder.map((key, index) => ({
      name: key,
      value: keyCount[key] || 0,
      fill: keyColors[index],
    }));
  };

  useEffect(() => {
    if (searchResult.length > 0) {
      const keyCount = getKeyCount(searchResult);
      const sortedKeyData = getSortedKeyData(keyCount);
      setKeyData(sortedKeyData);
    }
  }, [searchResult]);

  const handleArtistClick = async (artistId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/get_songs_by_artist/?artist_id=${artistId}`);
      const data = await response.json();
      setSearchResult(data);
      setSearchQuery('');
      setSearchPerformed(true);
      const artistName = artistData.find(artist => artist.id === artistId)?.name;
      setSelectedArtist(artistName || null);
    } catch (error) {
      console.error(error);
      setErrorMessage('データの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div>
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        artistData={artistData} 
        handleArtistClick={handleArtistClick} 
      />
      {errorMessage ? (
        <div className="flex justify-center mt-10">{errorMessage}</div>
      ) : loading ? (
        <div className="flex justify-center mt-10">
          <div>
            データを取得中です。しばらくお待ちください
          </div>
        </div>
      ) : searchPerformed && searchResult.length === 0 ? (
        <div>検索結果が0件でした</div>
      ) : keyData.length > 0 ? (
        <div>
          <h2 className="flex justify-center py-5 text-lg">{selectedArtist ? `${selectedArtist} の楽曲の調データ` : '楽曲の調データ'}</h2>
          <div className="flex justify-center">
          <KeyDataList keyData={keyData} />
            <div className="mr-2 mt-4 300px">
              <KeyChart  keyData={keyData} />
            </div>
          </div>
          <ResultTable searchResult={searchResult} />
        </div>
      ) : null}
    </div>
  );
};