import React from "react";
import ContentBox from "../parents/UI/ContentBox";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface OrganizationUserStrenghtProps {
  signupsData?: {
    labels: string[];
    data: number[];
  };
  loading?: boolean;
}

const OrganizationUserStrenght = ({ signupsData, loading }: OrganizationUserStrenghtProps) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Signups Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const chartData = {
    labels: signupsData?.labels || [],
    datasets: [
      {
        label: 'Daily Signups',
        data: signupsData?.data || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  if (loading) {
    return (
      <ContentBox 
        title="Users Strength"
        padding="small"
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          height: "400px",
          overflowY: "auto",
        }} 
        size={"large"}
      >
        <div className="flex h-[300px] items-center justify-center">
          <p className="animate-pulse text-gray-500">Loading analytics...</p>
        </div>
      </ContentBox>
    );
  }

  return (
    <ContentBox 
      title="Users Strength"
      padding="small"
      style={{
        minWidth: "100%",
        maxWidth: "100%",
        height: "400px",
        overflowY: "auto",
      }} 
      size={"large"}
    >
      <div className="h-[300px]">
        {signupsData && signupsData.data.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No signup data available</p>
          </div>
        )}
      </div>
    </ContentBox>
  );
};

export default OrganizationUserStrenght;