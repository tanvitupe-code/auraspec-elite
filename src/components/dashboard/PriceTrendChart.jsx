import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function PriceTrendChart({ historyData, productTitle }) {
  const labels = historyData?.map(h => h.date) || ['Q1', 'Q2', 'Q3', 'Q4'];
  const dataPoints = historyData?.map(h => h.price) || [100, 200, 300, 400];

  const data = {
    labels,
    datasets: [{
      label: 'Value Trajectory Track (USD)',
      data: dataPoints,
      fill: true,
      borderColor: '#22d3ee',
      borderWidth: 2,
      tension: 0.3,
      backgroundColor: 'rgba(34, 211, 238, 0.05)',
      pointBackgroundColor: '#020617',
      pointBorderColor: '#22d3ee'
    }]
  };

  return (
    <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 h-64">
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
}