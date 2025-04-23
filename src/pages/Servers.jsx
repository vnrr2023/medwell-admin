import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Layout from '../components/Layout';
import { Server, Activity, Clock } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const servers = [
  {
    name: 'Google Maps API',
    url: 'https://gmapsmedwell.vercel.app/',
    color: '#4285F4',
    icon: <Server className="w-5 h-5 text-blue-500" />,
  },
  {
    name: 'Doctor Search API',
    url: 'https://doctor-search-medwell.vercel.app/',
    color: '#34A853',
    icon: <Server className="w-5 h-5 text-green-500" />,
  },
  {
    name: 'Admin Backend',
    url: 'https://medwell-admin-backend.vercel.app/api/users/checkserver',
    color: '#FFC1D3',
    icon: <Server className="w-5 h-5 text-green-500" />,
  },
  {
    name: 'WhatsApp Messaging API',
    url: 'https://whatsapp-messaging-medwell-api.vercel.app/test',
    color: '#25D366',
    icon: <Server className="w-5 h-5 text-green-400" />,
  },
  {
    name: 'Chatbot API',
    url: 'https://pek9zb7udi.execute-api.us-east-1.amazonaws.com/chatbot/test',
    color: '#FF6B6B',
    icon: <Server className="w-5 h-5 text-red-500" />,
  },
  {
    name: 'Analytics API',
    url: 'https://pek9zb7udi.execute-api.us-east-1.amazonaws.com/analytics/test',
    color: '#4ECDC4',
    icon: <Server className="w-5 h-5 text-teal-500" />,
  },
  {
    name: 'Auth API',
    url: 'https://pek9zb7udi.execute-api.us-east-1.amazonaws.com/main/auth/health',
    color: '#FFD166',
    icon: <Server className="w-5 h-5 text-yellow-500" />,
  },
  {
    name: 'Appointment API',
    url: 'https://pek9zb7udi.execute-api.us-east-1.amazonaws.com/appointment/health',
    color: '#6A0572',
    icon: <Server className="w-5 h-5 text-purple-500" />,
  },
];

const ServerCard = ({ server, status, responseTime, uptime, downtime }) => {
  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => `${i * 60}s`),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: responseTime,
        borderColor: server.color,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Response Time (ms)',
        },
      },
    },
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);
    
    return parts.join(' ');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {server.icon}
          <h3 className="text-sm font-semibold ml-2 text-gray-700 dark:text-gray-300">{server.name}</h3>
        </div>
        <div className={`w-3 h-3 rounded-full ${status === null ? 'bg-gray-500' : status ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>
      <div className="flex items-center mb-2">
        <Clock className="w-4 h-4 mr-2 text-gray-500" />
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {status ? (
            <div>Uptime: {formatTime(uptime)}</div>
          ) : (
            <div>Downtime: {formatTime(downtime)}</div>
          )}
        </div>
      </div>
      <div className="h-32 mt-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const Servers = () => {
  const [serverStatuses, setServerStatuses] = useState(() => {
    return servers.reduce((acc, server) => {
      acc[server.url] = {
        status: null,
        responseTime: JSON.parse(localStorage.getItem(`server_response_times_${server.url}`)) || [],
        uptime: parseInt(localStorage.getItem(`server_uptime_${server.url}`)) || 0,
        downtime: parseInt(localStorage.getItem(`server_downtime_${server.url}`)) || 0,
        lastChecked: parseInt(localStorage.getItem(`server_last_checked_${server.url}`)) || Date.now(),
      };
      return acc;
    }, {});
  });

  const checkServers = async () => {
    const newStatuses = { ...serverStatuses };
    
    for (const server of servers) {
      try {
        const startTime = Date.now();
        const response = await fetch(server.url);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        const status = response.ok;

        newStatuses[server.url] = {
          ...newStatuses[server.url],
          status,
          responseTime: [...(newStatuses[server.url].responseTime || []).slice(-29), responseTime],
          uptime: status ? newStatuses[server.url].uptime + 60 : newStatuses[server.url].uptime,
          downtime: status ? newStatuses[server.url].downtime : newStatuses[server.url].downtime + 60,
          lastChecked: Date.now(),
        };

        // Save to localStorage
        localStorage.setItem(`server_response_times_${server.url}`, JSON.stringify(newStatuses[server.url].responseTime));
        localStorage.setItem(`server_uptime_${server.url}`, newStatuses[server.url].uptime.toString());
        localStorage.setItem(`server_downtime_${server.url}`, newStatuses[server.url].downtime.toString());
        localStorage.setItem(`server_last_checked_${server.url}`, newStatuses[server.url].lastChecked.toString());
      } catch (error) {
        newStatuses[server.url] = {
          ...newStatuses[server.url],
          status: false,
          responseTime: [...(newStatuses[server.url].responseTime || []).slice(-29), 0],
          downtime: newStatuses[server.url].downtime + 60,
          lastChecked: Date.now(),
        };
      }
    }
    
    setServerStatuses(newStatuses);
  };

  useEffect(() => {
    let intervalId = null;

    const clearServerInterval = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const setupInterval = () => {
      clearServerInterval();
      if (!document.hidden) {
        checkServers();
        intervalId = setInterval(checkServers, 60000);
      }
    };

    setupInterval();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearServerInterval();
      } else {
        setupInterval();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearServerInterval();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Server Health Monitoring</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servers.map((server) => (
            <ServerCard
              key={server.url}
              server={server}
              status={serverStatuses[server.url]?.status}
              responseTime={serverStatuses[server.url]?.responseTime || []}
              uptime={serverStatuses[server.url]?.uptime || 0}
              downtime={serverStatuses[server.url]?.downtime || 0}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Servers; 