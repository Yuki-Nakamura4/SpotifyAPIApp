import React, { useState, useEffect} from 'react';
import { SearchSection } from '../organisms/SearchSection';
import { KeyChart } from '../organisms/KeyChart';
import { KeyDataList } from '../organisms/KeyDataList';
import { SongsTable } from '../organisms/SongsTable';
import { keysInfo } from '../../data/KeysInfo';
import { useFetchArtistData } from '../../hooks/useFetchArtistData';
import { useFetchSongsByArtist } from '../../hooks/useFetchSongsByArtist';
import { KeyData } from '../../types/KeyData';
import { ArtistData } from '../../types/ArtistData';
import { LoadingSpinner } from '../atoms/Loading';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<{ 曲名: string; キー: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyData, setKeyData] = useState<KeyData[]>([]);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [aveKeySign, setAveKeySign] = useState<number>(0);
  const [flatPercentage, setFlatPercentage] = useState<number>(0);
  const [sharpPercentage, setSharpPercentage] = useState<number>(0);
  const { artistData }: { artistData: ArtistData } = useFetchArtistData(searchQuery);
  const [songsErrorMessage, setSongsErrorMessage] = useState<string>('');

  // 楽曲のデータからキーのデータを取得する関数
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

  // キーのデータを五度圏の順にソートする関数
  const getSortedKeyData = (keyCount: { [key: string]: number }) => {
    return keysInfo.map((keyInfo) => ({
      name: keyInfo.name,
      value: keyCount[keyInfo.name] || 0,
      fill: keyInfo.color,
      sign: keyInfo.keySign
    }));
  };

  // useEffectはレンダリング時に実行される副作用のフック
  // 初回レンダリング時と、再レンダリング時に第二引数の値に差分があったときのみ実行される
  // 外部APIからデータを取得する処理はuseEffect内で行う
  useEffect(() => {
    if (searchResult.length > 0) {
      const keyCount = getKeyCount(searchResult);
      const sortedKeyData = getSortedKeyData(keyCount);
      setKeyData(sortedKeyData);

      // 平均調号数の計算
      const totalKeyCount = keysInfo.reduce((acc, { name, keySignNum }) => acc + keySignNum * (keyCount[name] || 0), 0);
      const averageKeyCount = totalKeyCount / searchResult.length;
      const aveKeySign = averageKeyCount.toFixed(1);
      setAveKeySign(parseFloat(aveKeySign));

      // フラットとシャープの比率を計算
      const flatCount = keysInfo.reduce((acc, { name, flatNum }) => acc + flatNum * (keyCount[name] || 0), 0);
      const sharpCount = keysInfo.reduce((acc, { name, sharpNum }) => acc + sharpNum * (keyCount[name] || 0), 0);
      const flatParcentage = (flatCount / (flatCount + sharpCount)) * 100;
      const sharpParcentage = 100 - flatParcentage;
      setFlatPercentage(flatParcentage);
      setSharpPercentage(sharpParcentage);
    }
  }, [searchResult]); // 検索結果に変更があったときのみ実行

  const handleArtistClick = useFetchSongsByArtist({
    setLoading,
    setSearchResult,
    setSearchQuery,
    setSearchPerformed,
    setSelectedArtist,
    setSongsErrorMessage,
    artistData,
  });

  const keyCount = getKeyCount(searchResult);

  return (
    <div>
      <SearchSection 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        artistData={artistData} 
        handleArtistClick={handleArtistClick} 
      />
      {songsErrorMessage ? (
        <div className="flex justify-center mt-10">{songsErrorMessage}</div>
      ) : loading ? (
        <div className="flex justify-center mt-10 ">
        <div>
        <LoadingSpinner />
        </div>
        </div>
      ) : searchPerformed && searchResult.length === 0 ? (
        <div className="flex justify-center mt-4">検索結果が0件でした</div>
      ) : keyData.length > 0 ? (
        <div>
          <div className="flex justify-center py-5 text-xl text-slate-800">{selectedArtist ? `${selectedArtist} の楽曲の調データ` : '楽曲の調データ'}</div>
            <div className="flex justify-center">
              <div className="lg:w-2/5 md:w-2/3 bg-slate-50 px-4">
                <KeyDataList keyData={keyData} keyCount={keyCount}/>
              </div>
            </div>
          <div className="flex justify-center mt-4">
          {/* 多いのか少ないのか分かりずらいから図示した方がいいのかも*/}
          <div className="pr-10 text-lg text-slate-600 flex items-center">平均調号数: {aveKeySign}</div>
            <div>
              <div className="text-sky-700">フラット ♭: {flatPercentage.toFixed(1)}% </div>
              <div className="text-amber-600">シャープ ♯: {sharpPercentage.toFixed(1)}%</div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="md:w-2/5 sm:w-1/2">
              <div className="w-full flex justify-center">
              <KeyChart  keyData={keyData}/>
              </div>
            </div>
          </div>
          <SongsTable searchResult={searchResult} />
        </div>
      ) : null}
    </div>
  );
};