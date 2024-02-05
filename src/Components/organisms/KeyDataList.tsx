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

  return (
    <div className="my-4 mx-2 flex flex-wrap text-slate-800">
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
           <span className={`ml-auto mr-4 text-gray-500 ${keyCount[key.name] === maxKeyCount ? 'text-slate-600' : ''}`}>
            {keyCount[key.name]}曲
          </span>
        </div>
      ))}
    </div>
  );
};
