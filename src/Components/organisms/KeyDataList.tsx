import React from 'react';

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

type KeyDataListProps = {
  keyData: KeyData[];
};

const keySigns: Record<string, string> = {
  "C/Am": "♮",
  "G/Em": "♯",
  "D/Bm": "♯♯",
  "A/F♯m": "♯♯♯",
  "E/C♯m": '♯♯♯♯',
  "B/G♯m": '♯♯♯♯♯',
  "G♭/D♯m":'♭♭♭♭♭♭/♯♯♯♯♯♯',
  "D♭/B♭m":'♭♭♭♭♭',
  "A♭/Fm":  '♭♭♭♭',
  "E♭/Cm":'♭♭♭',
  "B♭/Gm":  '♭♭',
  "F/Dm": '♭',
};

export const KeyDataList: React.FC<KeyDataListProps> = ({ keyData }) => {
  return (
    // flex-wrap: flexアイテムが折り返し表示されるようにする
    <div className=" my-4 mx-4 flex flex-wrap">
      {keyData.map((key, index) => (
        // w-1/2: 幅を親要素の半分にする
        //　つまり、1行に2つの要素を表示して折り返し表示する
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
          <span className="text-slate-500">　({keySigns[key.name]})</span>
        </div>
      ))}
    </div>
  );
};