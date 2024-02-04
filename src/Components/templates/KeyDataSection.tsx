// KeyDataSection.tsx
import React from 'react';
import { KeyDataList } from '../organisms/KeyDataList';
import { KeyChart }from '../organisms/KeyChart';
import { SongsTable } from '../organisms/SongsTable';

type KeyData = {
    name: string;
    value: number;
    fill: string;
    sign: string;
};

type KeyDataSectionProps = {
  keyData: KeyData[];
  searchResult: { 曲名: string; キー: string }[];
}

const KeyDataSection: React.FC<KeyDataSectionProps> = ({ keyData, searchResult }) => {
  return (
    <div className="flex justify-center">
      <KeyDataList keyData={keyData} />
      <div className="mr-2 mt-4 300px">
        <KeyChart keyData={keyData} />
      </div>
      <SongsTable searchResult={searchResult} />
    </div>
  );
};

export default KeyDataSection;