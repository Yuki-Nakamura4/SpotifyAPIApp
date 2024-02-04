import React, { useState, useEffect} from 'react';
import { SearchSection } from '../organisms/SearchSection';
import { KeyChart } from '../organisms/KeyChart';
import { KeyDataList } from '../organisms/KeyDataList';
import { SongsTable } from '../organisms/SongsTable';
import { keysInfo } from '../../data/KeysInfo';
import { TailSpin } from 'react-loader-spinner';
import { useFetchArtistData } from '../../hooks/useFetchArtistData';
import { useFetchSongsByArtist } from '../../hooks/useFetchSongsByArtist';
import { KeyData } from '../../types/KeyData';
import { ArtistData } from '../../types/ArtistData';

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
  const { artistData}: { artistData: ArtistData} = useFetchArtistData(searchQuery);
  const [songsErrorMessage, setSongsErrorMessage] = useState<string>('');

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

  // useEffectは初回レンダリング時と、再レンダリング時に第二引数の値に差分があったときのみ実行される
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
  }, [searchResult]);

  const handleArtistClick = useFetchSongsByArtist({
    setLoading,
    setSearchResult,
    setSearchQuery,
    setSearchPerformed,
    setSelectedArtist,
    setSongsErrorMessage,
    artistData,
  });

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
        <TailSpin 
        color="rgb(6 182 212)"
        radius="2"/>
        </div>
        </div>
      ) : searchPerformed && searchResult.length === 0 ? (
        <div>検索結果が0件でした</div>
      ) : keyData.length > 0 ? (
        <div>
          <h2 className="flex justify-center py-5 text-xl text-slate-800">{selectedArtist ? `${selectedArtist} の楽曲の調データ` : '楽曲の調データ'}</h2>
          <div className="flex justify-center">
          <KeyDataList keyData={keyData} />
          {/* 多いのか少ないのか分かりずらいから図示した方がいいのかも*/}
          <div className="pr-10 text-slate-700">平均調号数: {aveKeySign}</div>
          <div className="text-slate-700">
          <div>フラット: {flatPercentage.toFixed(1)}% </div>
          <div>シャープ: {sharpPercentage.toFixed(1)}%</div>
          </div>
            <div className="mr-2 mt-4 300px">
              <KeyChart  keyData={keyData} />
            </div>
          </div>
          <SongsTable searchResult={searchResult} />
        </div>
      ) : null}
    </div>
  );
};