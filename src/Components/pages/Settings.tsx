import React, { useState, useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { keysColor as initialKeysColor, UsersColor } from '../../data/KeysColor';

export const Settings = () => {
  const [usersColors, setUsersColors] = useState<UsersColor>({});
  const [keysColor, setKeysColor] = useState(initialKeysColor);
  const [resetKey, setResetKey] = useState<number>(0);

  useEffect(() => {
    const storedColors: UsersColor = JSON.parse(localStorage.getItem('userColors') || '{}');
    setUsersColors(storedColors);
  }, []);

  useEffect(() => {
    localStorage.setItem('userColors', JSON.stringify(usersColors));
  }, [usersColors]);

  const handleColorChange = (keyName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColors = { ...usersColors, [keyName]: event.target.value };
    setUsersColors(newColors);
  };

  const handleReset = () => {
    const resetColors = initialKeysColor.reduce((colors, key) => ({ ...colors, [key.name]: key.color }), {});
    setUsersColors(resetColors);
    setKeysColor(initialKeysColor);
    setResetKey(prevKey => prevKey + 1); // increment the resetKey to force re-render
  };

  // チャートのデータとオプションの定義
  const chartData = {
    labels: Object.keys(usersColors),
    datasets: [
      {
        data: Array(Object.keys(usersColors).length).fill(10), // 各キーの値を10で固定
        backgroundColor: Object.values(usersColors),
      },
    ],
  };

  // グラフの設定
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        startAngle: -15, // 開始角度を15度ずらしてハ長調を真上にし、五度圏の形にする
        ticks: {
          display: false,
        },
      },
    },
  };

  // 1行に6つのキーを表示するためのグループ化
  const keyGroups = [];
  for (let i = 0; i < keysColor.length; i += 6) {
    keyGroups.push(keysColor.slice(i, i + 6));
  }

  return (
    <>
      <div className="mt-8 flex justify-center text-lg text-slate-700">調の色を自由に設定しましょう！</div>
      <div className="mt-2 mb-5 flex justify-center text-lg text-slate-700">※ 調名の横の四角をクリックすると色を変更できます</div>
      <div >
        {keyGroups.map((group, index) => (
          <div key={index} className="flex justify-center">
            {group.map((key) => (
              <div key={key.name} className="ml-2 color-option">
                <label>{key.name}:</label>
                <input type="color" value={usersColors[key.name]} onChange={handleColorChange(key.name)} />
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-center">
          <button className="mt-6 py-2 px-3 rounded-md text-sm text-slate-800 bg-white shadow-md" onClick={handleReset}>設定をリセット</button>
          </div>
          <div className="mt-10 flex text-xl text-slate-800 justify-center">プレビュー</div>
        <div className="mt-5 flex justify-center">
        <div className=" w-1/3">
          <PolarArea data={chartData} options={options}/>
        </div>
        </div>
      </div>
    </>
  );
};
