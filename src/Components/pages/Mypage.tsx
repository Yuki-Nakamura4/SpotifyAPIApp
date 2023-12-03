import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import QuizGenerator from '../organisms/QuizGenerator';

const Mypage = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        // チャートインスタンスがすでに存在する場合、破棄
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [
              {
                label: 'サンプルデータ',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, []);

  return (
    <div>
      <p>マイページよ</p>
      <canvas ref={chartRef} width="400" height="200"></canvas>
      <QuizGenerator />
    </div>
  );
};

export default Mypage;