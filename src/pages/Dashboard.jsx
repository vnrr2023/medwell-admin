import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import Layout from '../components/Layout';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const mockData = {
  totalUsers: 10000,
  patients: 8500,
  doctors: 1200,
  hospitals: 300,
};

const mockChartData = {
  pieData: {
    labels: ['Patients', 'Doctors', 'Hospitals'],
    datasets: [{
      data: [8500, 1200, 300],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  },
  lineData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'User Growth',
      data: [6500, 7000, 7500, 8000, 9000, 10000],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  barData: {
    labels: ['Cardiology', 'Neurology', 'Pediatrics', 'Oncology', 'Orthopedics'],
    datasets: [{
      label: 'Doctors by Specialty',
      data: [300, 250, 200, 150, 100],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  },
  doughnutData: {
    labels: ['Public', 'Private', 'Non-Profit'],
    datasets: [{
      data: [150, 100, 50],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  }
};

const mockNews = [
  { id: 1, title: "New COVID-19 Variant Discovered", content: "Researchers have identified a new COVID-19 variant. Studies are ongoing to determine its impact." },
  { id: 2, title: "Breakthrough in Cancer Treatment", content: "A new immunotherapy technique shows promising results in treating advanced stages of lung cancer." },
  { id: 3, title: "Mental Health Awareness Month", content: "Healthcare providers emphasize the importance of mental health during the pandemic." },
];

const Dashboard = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % mockNews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h2>
        
        {/* User Counts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(mockData).map(([key, value]) => (
            <div key={key} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">User Distribution</h3>
            <Pie data={mockChartData.pieData} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">User Growth</h3>
            <Line data={mockChartData.lineData} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Doctors by Specialty</h3>
            <Bar data={mockChartData.barData} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Hospital Types</h3>
            <Doughnut data={mockChartData.doughnutData} />
          </div>
        </div>

        {/* News Carousel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Medical News</h3>
          <div className="relative h-40">
            {mockNews.map((news, index) => (
              <div
                key={news.id}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === currentNewsIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{news.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{news.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;