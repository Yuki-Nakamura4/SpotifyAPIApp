// SongsTable.tsx
import React from 'react';
import { keysColor, KeysColor } from '../../data/KeysColor';

type SongsTableProps = {
  searchResult: { 曲名: string; キー: string }[];
}

export const SongsTable: React.FC<SongsTableProps> = ({ searchResult }) => {
  const getBackgroundColor = (key: string): string => {
    const foundKey = keysColor.find((item: KeysColor) => item.name === key);
     // 各キーの色を不透明度40%にした色で背景色にする。キーが不明な場合は白を返す
    return foundKey ? `${foundKey.color}3B` : '#fffff';
  };

  return (
    <div className="m-8 sm:mx-52">
      <div className="max-h-96 overflow-y-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-white mx-8">
              <th className="pl-4 py-2 text-left text-slate-500">曲名</th>
              <th className="pl-4 py-2 text-left text-slate-500">キー</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((item, index) => (
              <tr key={index} style={{ backgroundColor: getBackgroundColor(item.キー) }} className="bg-slate-100">
                <td className="px-4 py-2 text-slate-700">{item.曲名}</td>
                <td className="px-4 py-2 text-slate-700">{item.キー}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
