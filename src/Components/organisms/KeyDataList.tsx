import React from 'react';
import {KeyData} from '../../types/KeyData';

type KeyDataListProps = {
  keyData: KeyData[];
};

export const KeyDataList: React.FC<KeyDataListProps> = ({ keyData }) => {
  return (
    // flex-wrap: flexアイテムが折り返し表示されるようにする
    <div className=" my-4 mx-4 flex flex-wrap text-slate-800">
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
          <span className="text-slate-500"> ({key.sign})</span>
        </div>
      ))}
    </div>
  );
};