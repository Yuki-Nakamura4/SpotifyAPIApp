// ResultTable.tsx
import React from 'react';

interface ResultTableProps {
  searchResult: { 曲名: string; キー: string }[];
}

const ResultTable: React.FC<ResultTableProps> = ({ searchResult }) => (
  <div className="m-8 sm:mx-52">
    <div className="max-h-96 overflow-y-auto">
      <table className="w-full border-collapse border border-cyan-700">
        <thead>
          <tr className="bg-cyan-600 mx-8">
            <th className="pl-4 py-2 text-left text-white">曲名</th>
            <th className="pl-4 py-2 text-left text-white">キー</th>
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
);

export default ResultTable;