import React from 'react';
import { PolarArea } from 'react-chartjs-2';

type KeyData = {
  name: string;
  value: number;
  fill: string;
};

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

  const options: {} = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        startAngle: -15,
        ticks: {
          display: false,
        },
      },
    },
  };

  return <PolarArea data={chartData} options={options} />;
};
