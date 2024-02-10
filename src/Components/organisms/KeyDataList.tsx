import React from 'react';
import { KeyData } from '../../types/KeyData';

type KeyDataListProps = {
  keyData: KeyData[];
  keyCount: { [key: string]: number | undefined };
};

export const KeyDataList: React.FC<KeyDataListProps> = ({ keyData, keyCount }) => {
  // keyCountの中で最大の曲数を持つ調を見つける
  let maxKeyCount = 0;
  Object.values(keyCount).forEach((count) => {
    if (count && count > maxKeyCount) {
      maxKeyCount = count;
    }
  });

  // 総楽曲数の計算
  const totalSongs = Object.values(keyCount).reduce((acc: number, count)=> (count ? acc + count : acc), 0);

  return (
  <div>
    {/* 総楽曲数を表示 */}
    <div className="flex justify-center items-end text-slate-700 mt-2 mx-2 text-md font-bold">
      総楽曲数&nbsp;<span className="text-xl">{totalSongs}</span> 曲
    </div>
    {/* キーのデータを表示 */}
    <div className="mb-4 mt-2 mx-2 flex flex-wrap">
      <br />
      {keyData.map((key, index) => (
        <div key={index} className="w-1/2 flex items-center">
          <div
            style={{
              width: '18px',
              height: '18px',
              backgroundColor: key.fill,
              marginRight: '4px',
            }}
          ></div>
          <span>{key.name}</span>
          <span className="text-slate-500"> ({key.sign})</span>
           {/* keyCount[key.name]が最大曲数と一致する場合、text-slate-600を適用 */}
           <span className={`ml-auto mr-4 text-gray-500 ${keyCount[key.name] === maxKeyCount ? 'text-orange-600' : ''}`}>
            {keyCount[key.name] || 0}曲
          </span>
        </div>
      ))}
    </div>
    </div>
  );
};
