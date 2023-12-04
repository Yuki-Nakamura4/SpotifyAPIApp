import React, { useState, useEffect} from 'react';
import SearchSection from '../organisms/SearchSection';
import KeyChart from '../organisms/KeyChart';
import {KeyDataList} from '../organisms/KeyDataList';
import ResultTable from '../organisms/ResultTable';
import { keysInfo } from '../../data/KeysInfo';

type KeyData = {
  name: string;
  value: number;
  fill: string;
  sign: string;
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

    // 平均調号数の計算
    // reduceメソッドは、配列の各要素に対して引数で与えられた関数を実行して、その結果を1つにまとめるメソッド
    // accは、前回のコールバックの戻り値を引数に受け取る変数
    // KeyOrder配列の各要素に対して指定された処理を実行し、その結果を1つにまとめる(値の数が一つに減るのでreduceメソッド)
    // 今回は各キーに設定された調号数(keyMapping[key])と、そのキーの出現回数(keyCount[key])を掛け合わせている
    // reduce()メソッドの最後の0は、accの初期値を0に設定している
      const totalKeyCount = keysInfo.reduce((acc, { name, keySignNum }) => acc + keySignNum * (keyCount[name] || 0), 0);
      const averageKeyCount = totalKeyCount / searchResult.length;
      // toFixed()メソッドは、小数点以下の桁数を指定できる
      // 指定した桁数になるように四捨五入したものを文字列として返す
      const aveKeySign = averageKeyCount.toFixed(1);
      // parseFloat()メソッドは、文字列を浮動小数点数に変換する
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
