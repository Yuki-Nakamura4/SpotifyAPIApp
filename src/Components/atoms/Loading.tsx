import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';

export const LoadingSpinner: React.FC = () => {
  const [dots, setDots] = useState('.');

  // ユーザーの待ち時間の不満を緩和するために点の動きを表示する
  useEffect(() => {
    const interval = setInterval(() => {
      // 現在の点の数に応じて次の点の数を設定
      setDots((prevDots) => {
        switch (prevDots) {
          case '.':
            return '..';
          case '..':
            return '...';
          case '...':
            return '.';
          default:
            return '.';
        }
      });
    }, 500); // 0.5秒ごとに点の数を変更

    // コンポーネントがアンマウントされた時にクリーンアップ
    return () => clearInterval(interval);
  }, []); // 空の配列を渡して、コンポーネントがマウントされた時のみ実行されるようにする

  // 今の実装だと点の数が変わるたびにNow Loadingの位置がズレてしまうが、Now Loadingは固定して点だけを動かしたい
  return (
    <>
      <div className="flex justify-center mt-10">
        <div>
          <Circles color="rgb(6 182 212)" />
        </div>
      </div>
      <span className="mt-2 text-slate-700">Now Loading</span>
      <span>{dots}</span>
    </>
  );
};
