// ResultTable.tsx
import React from 'react';

type ResultTableProps = {
  searchResult: { 曲名: string; キー: string }[];
}

export const ResultTable: React.FC<ResultTableProps> = ({ searchResult }) => (
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
            <tr key={index} className="bg-slate-100">
              <td className="px-4 py-2">{item.曲名}</td>
              <td className="px-4 py-2">{item.キー}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);