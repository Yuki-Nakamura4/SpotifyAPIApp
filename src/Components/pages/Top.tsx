import React, { useState, useEffect, useMemo } from 'react';
import SearchSection from '../organisms/SearchSection';
import KeyChart from '../organisms/KeyChart';
import {KeyDataList} from '../organisms/KeyDataList';
import ResultTable from '../organisms/ResultTable';

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

type KeyInfo = {
  name: string;
  color: string;
  keySignNum: number;
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
  const [aveKeySign, setAveKeySign] = useState<number>(0);

  // 12種類のキーのオブジェクトを格納した配列
  // 名前、色、フラットの数、シャープの数、調号の数を格納
  // keySignNumをsharpNum+flatNumとしていないのは、G♭/D♯mがあるため
  // G♭/D#mは♭6つと#6つとも表現できるのでどちらの解釈も残しておきたいが、
  // keySignNum=sharpNum+flatNumとすると、どちらかしか表現できないため
  const KeysInfo: KeyInfo[] = useMemo(() => [
    { name: "C/Am", color: '#fff8ff',  sharpNum:0, flatNum:0, keySignNum: 0 },
    { name: "G/Em", color: '#00CEFF',  sharpNum:1, flatNum:0, keySignNum: 1 },
    { name: "D/Bm", color: '#FFFF8A', sharpNum:2, flatNum:0, keySignNum: 2 },
    { name: "A/F♯m", color: '#FF596D', sharpNum:3, flatNum:0, keySignNum: 3 },
    { name: "E/C♯m", color: '#00FF7E', sharpNum:4, flatNum:0, keySignNum: 4 },
    { name: "B/G♯m", color: '#FFC88A', sharpNum:5, flatNum:0, keySignNum: 5 },
    { name: "G♭/D♯m", color: '#BB62FF', sharpNum:6, flatNum:6, keySignNum: 6 },
    { name: "D♭/B♭m", color: '#D4FFF6', sharpNum:0, flatNum:5, keySignNum: 5 },
    { name: "A♭/Fm", color: '#4F5EFF', sharpNum:0, flatNum:4, keySignNum: 4 },
    { name: "E♭/Cm", color: '#00B5D4', sharpNum:0, flatNum:3, keySignNum: 3 },
    { name: "B♭/Gm", color: '#ECEBEC', sharpNum:0, flatNum:2, keySignNum: 2 },
    { name: "F/Dm", color: '#FFF8D8', sharpNum:0, flatNum:1, keySignNum: 1 },
  ], []);

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
    return KeysInfo.map((keyInfo) => ({
      name: keyInfo.name,
      value: keyCount[keyInfo.name] || 0,
      fill: keyInfo.color
    }));
  };

  useEffect(() => {
    if (searchResult.length > 0) {
      const keyCount = getKeyCount(searchResult);
      const sortedKeyData = getSortedKeyData(keyCount);
      setKeyData(sortedKeyData);

    // 平均調号数の計算
    // reduceメソッドは、配列の各要素に対して引数で与えられた関数を実行して、その結果を1つにまとめるメソッド
    // accは、前回のコールバックの戻り値を引数に受け取る変数
    // KeyOrder配列の各要素に対して指定された処理を実行し、その結果を1つにまとめる(値の数が一つに減るのでreduceメソッド)
    // 今回は各キーに設定された調号数(keyMapping[key])と、そのキーの出現回数(keyCount[key])を掛け合わせている
    // 最後の0は、accの初期値を0に設定している
      const totalKeyCount = KeysInfo.reduce((acc, { name, keySignNum }) => acc + keySignNum * (keyCount[name] || 0), 0);
      const averageKeyCount = totalKeyCount / searchResult.length;
      const aveKeySign = averageKeyCount.toFixed(1);
      setAveKeySign(parseFloat(aveKeySign));
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
      <SearchSection 
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
          <div className="pr-10">平均調号数: {aveKeySign}</div>
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

export default Top;
