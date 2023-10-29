import { useState, useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';

interface KeyData {
  name: string;
  value: number;
  fill: string;
}

export const Top: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<{ 曲名: string; キー: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [keyData, setKeyData] = useState<KeyData[]>([]);
  const [searchButtonClicked, setSearchButtonClicked] = useState<boolean>(false);

  // 五度圏の順(真上から時計回りにC, D, G......)
  const KeysOrder = ["C/Am", "G/Em", "D/Bm", "A/F#m", "E/C#m", "B/G#m", "G♭/D#m", "D♭/B♭m", "A♭/Fm", "E♭/Cm", "B♭/Gm", "F/Dm"];
  
  // 12種類のキーに異なる色を割り当てる
  const keyColors: string[] = [
    // C=白, G=青, D=黄, A=赤紫, E=緑, B=橙
    '#fff8ff', '#00CEFF', '#FFFF8A', '#FF596D', '#00FF7E', '#FFC88A',
    // F#=紫, D♭=薄い青緑, A♭=青紫, E♭=青緑, B♭=グレー, F=ベージュ
    '#BB62FF', '#D4FFF6', '#4F5EFF', '#00B5D4', '#ECEBEC', '#FFF8D8',
  ];

  // 検索ボタンが実行されたときの処理
  const handleSearch = () => {
    //　ユーザーが何も入力していなければ処理を終了する
    if (searchQuery.trim() === '') {
      return;
    }
    // データの取得中であることを表示
    setLoading(true);
    // 検索結果が0件ではないことを明示的に設定
    setNoResults(false);
    // 検索ボタンがクリックされたことを示すフラグを設定
    setSearchButtonClicked(true);
  };

  
  useEffect(() => {
    if (searchButtonClicked) {
      // searchButtonClicked が true のときだけ実行
      fetch(`http://localhost:8000/search_artist/?artist=${searchQuery}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          setSearchResult(data);
          setLoading(false);
          if (data.length === 0) {
            setNoResults(true);
          } else {
            const keyCount: { [key: string]: number } = {};
            data.forEach((item: { 曲名: string; キー: string }) => {
              if (item.キー in keyCount) {
                keyCount[item.キー] += 1;
              } else {
                keyCount[item.キー] = 1;
              }
              console.log(keyCount);
            });

            const sortedKeyData = KeysOrder.map((key, index) => ({
              name: key,
              value: keyCount[key] || 0,
              fill: keyColors[index],
            }));



            setKeyData(sortedKeyData);
            console.log(sortedKeyData);
          }
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
      setSearchButtonClicked(false); // ボタンクリックフラグをリセット
    }
  }, [searchButtonClicked, searchQuery]);

  const chartData = {
    labels: keyData.map(entry => entry.name),
    datasets: [
      {
        data: keyData.map(entry => entry.value),
        backgroundColor: keyData.map(entry => entry.fill),
      },
    ],
  };

  return (
    <div>
      <input
        type="text"
        placeholder="検索キーワード"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>検索</button>
      {loading ? (
        <div>データを取得中です......</div>
      ) : noResults ? (
        <div>検索結果が0件でした</div>
      ) : keyData.length > 0 ? (
        <div>
          <h2>検索結果:</h2>
          <PolarArea data={chartData} />
        </div>
      ) : null}
    </div>
  );
};
