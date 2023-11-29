import React from 'react';

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

type KeyDataListProps = {
  keyData: KeyData[];
};

export const KeyDataList: React.FC<KeyDataListProps> = ({ keyData }) => {
  return (
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
  );
};