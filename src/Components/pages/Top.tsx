import React, { useState, useEffect, useMemo } from 'react';
import KeyChart from '../organisms/layout/KeyChart';
import ResultTable from '../organisms/layout/ResultTable';

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

export const Top: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<{ 曲名: string; キー: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [keyData, setKeyData] = useState<KeyData[]>([]);
  const [artistData, setArtistData] = useState<{ name: string; id: string }[]>([]);

  const KeysOrder = useMemo(() => ["C/Am", "G/Em", "D/Bm", "A/F♯m", "E/C♯m", "B/G♯m", "G♭/D♯m", "D♭/B♭m", "A♭/Fm", "E♭/Cm", "B♭/Gm", "F/Dm"], []);

  useEffect(() => {
    const keyColors: string[] = [
      '#fff8ff', '#00CEFF', '#FFFF8A', '#FF596D', '#00FF7E', '#FFC88A',
      '#BB62FF', '#D4FFF6', '#4F5EFF', '#00B5D4', '#ECEBEC', '#FFF8D8',
    ];

    if (searchResult.length > 0) {
      const keyCount: { [key: string]: number } = {};
      searchResult.forEach((item: { 曲名: string; キー: string }) => {
        if (item.キー in keyCount) {
          keyCount[item.キー] += 1;
        } else {
          keyCount[item.キー] = 1;
        }
      });
  
      const sortedKeyData = KeysOrder.map((key, index) => ({
        name: key,
        value: keyCount[key] || 0,
        fill: keyColors[index],
      }));
  
      setKeyData(sortedKeyData);
    }
  }, [ KeysOrder, searchResult]);

  // const handleSearch = () => {
  //   if (searchQuery.trim() === '') {
  //     return;
  //   }
  //   setLoading(true);
  //   setNoResults(false);
  //   setSearchButtonClicked(true);
  // };

  const handleArtistClick = (artistId: string) => {
  fetch(`http://localhost:8000/get_songs_by_artist/?artist_id=${artistId}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      setSearchResult(data);
      setSearchQuery('');
    })
    .catch(error => console.error(error));
};
  

  useEffect(() => {
    /*　検索欄に入力されたアーティスト名をもとにAPIから名前とIDの候補を取得　*/
    if (searchQuery !== '') {
      fetch(`http://localhost:8000/get_artists_name/?artist=${searchQuery}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          setArtistData(data);
        })
        .catch(error => console.error(error));
    }else {
      setArtistData([]); 
    }
  }, [searchQuery]);

  /*  */
  useEffect(() => {
    const keyColors: string[] = [
      '#fff8ff', '#00CEFF', '#FFFF8A', '#FF596D', '#00FF7E', '#FFC88A',
      '#BB62FF', '#D4FFF6', '#4F5EFF', '#00B5D4', '#ECEBEC', '#FFF8D8',
    ];

    if (searchResult.length > 0) {
      const keyCount: { [key: string]: number } = {};
      searchResult.forEach((item: { 曲名: string; キー: string }) => {
        if (item.キー in keyCount) {
          keyCount[item.キー] += 1;
        } else {
          keyCount[item.キー] = 1;
        }
      });

      const sortedKeyData = KeysOrder.map((key, index) => ({
        name: key,
        value: keyCount[key] || 0,
        fill: keyColors[index],
      }));

      setKeyData(sortedKeyData);
    }
  }, [KeysOrder, searchResult]);

    
  // useEffect(() => {
  //   if (searchButtonClicked) {
  //     fetch(`http://localhost:8000/search_artist/?artist=${searchQuery}`, {
  //       method: 'GET',
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         setSearchResult(data);
  //         setLoading(false);
  //         if (data.length === 0) {
  //           setNoResults(true);
  //         } else {
  //           const keyCount: { [key: string]: number } = {};
  //           data.forEach((item: { 曲名: string; キー: string }) => {
  //             if (item.キー in keyCount) {
  //               keyCount[item.キー] += 1;
  //             } else {
  //               keyCount[item.キー] = 1;
  //             }
  //           });

  //           const sortedKeyData = KeysOrder.map((key, index) => ({
  //             name: key,
  //             value: keyCount[key] || 0,
  //             fill: keyColors[index],
  //           }));

  //           setKeyData(sortedKeyData);
  //         }
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         setLoading(false);
  //       });
  //     setSearchButtonClicked(false);
  //   }
  // }, [KeysOrder, keyColors, searchButtonClicked, searchQuery]);

  return (
    <div>
      <div className="pt-4 flex justify-center">
        <input
          type="text"
          placeholder="検索キーワード"
          value={searchQuery}
          onChange={(e) => {
            console.log(e.target.value)
            setSearchQuery(e.target.value)
          }}
          className= "w-52 px-2 mx-auto justify-center text-center"
        />
        {/* <button className="ml-4 px-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700" onClick={handleSearch}> 検索 </button> */}
      </div>
      {artistData.map((artist, index) => (
    <div className="w-52 mx-auto" key={index} onClick={() => handleArtistClick(artist.id)}>
    <div className = "cursor-pointer flex justify-center hover:bg-slate-200">{artist.name}</div>
  </div>
))}
      {loading ? (
        <div className="flex justify-center">
          <div>
            データを取得中です...
          </div>
        </div>
      ) : noResults ? (
        <div>検索結果が0件でした</div>
      ) : keyData.length > 0 ? (
        <div>
          <div className="flex justify-center">
            <div className="my-4 mx-4 flex flex-wrap">
              {keyData.map((key, index) => (
                <div key={index} className="w-1/2 flex items-center">
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      backgroundColor: key.fill,
                      marginRight: "4px",
                    }}
                  ></div>
                  <span>{key.name}</span>
                </div>
              ))}
            </div>
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