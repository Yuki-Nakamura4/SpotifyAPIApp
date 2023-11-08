import React, { useState, useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';

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
  const [searchButtonClicked, setSearchButtonClicked] = useState<boolean>(false);

  const KeysOrder = ["C/Am", "G/Em", "D/Bm", "A/F♯m", "E/C♯m", "B/G♯m", "G♭/D♯m", "D♭/B♭m", "A♭/Fm", "E♭/Cm", "B♭/Gm", "F/Dm"];

  const keyColors: string[] = [
    '#fff8ff', '#00CEFF', '#FFFF8A', '#FF596D', '#00FF7E', '#FFC88A',
    '#BB62FF', '#D4FFF6', '#4F5EFF', '#00B5D4', '#ECEBEC', '#FFF8D8',
  ];

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return;
    }
    setLoading(true);
    setNoResults(false);
    setSearchButtonClicked(true);
  };

  useEffect(() => {
    if (searchButtonClicked) {
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
            });

            const sortedKeyData = KeysOrder.map((key, index) => ({
              name: key,
              value: keyCount[key] || 0,
              fill: keyColors[index],
            }));

            setKeyData(sortedKeyData);
          }
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
      setSearchButtonClicked(false);
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

  const options: {} = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        startAngle: -15,
        ticks: {
          display: false,
        },
      }
    }
  }

  return (
    <div>
      <div className="p-4 flex justify-center">
        <input
          type="text"
          placeholder="検索キーワード"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className= "w-52 px-2"
        />
        <button className="ml-4 px-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700" onClick={handleSearch}> 検索 </button>
      </div>
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
            <div className="mr-2 300px">
              <PolarArea data={chartData} options={options} />
            </div>
          </div>
          <div className="m-8 sm:mx-52">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border-collapse border border-cyan-700">
                <thead >
                  <tr className="bg-cyan-600 mx-8">
                    <th className="pl-4 py-2 text-left text-white">曲名</th>
                    <th className="pl-4  py-2 text-left text-white">キー</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{item.曲名}</td>
                      <td className="px-4 py-2">{item.キー}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};