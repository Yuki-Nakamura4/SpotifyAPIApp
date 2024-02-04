import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { KeyData } from '../../types/KeyData';

type KeyChartProps = {
  keyData: KeyData[];
}

export const KeyChart: React.FC<KeyChartProps> = ({ keyData }) => {
  const chartData = {
    labels: keyData.map(entry => entry.name),
    datasets: [
      {
        data: keyData.map(entry => entry.value),
        backgroundColor: keyData.map(entry => entry.fill),
      },
    ],
  };

  // グラフの設定
  const options: {} = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        startAngle: -15, // 開始角度を15度ずらしてCを真上にし、五度圏の形にする
        ticks: {
          display: false,
        },
      },
    },
  };

  return <PolarArea data={chartData} options={options} />;
};
