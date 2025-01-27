import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Layout from '../components/Layout';
import { FileText, Calendar, Users, IndianRupee, Server, Star, Shield, AlertTriangle, HelpCircle } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const mockData = {
  reports: {
    last24Hours: 150,
    total: 5000,
    history: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [100, 120, 140, 130, 150, 160, 150]
    }
  },
  appointments: {
    last24Hours: 300,
    total: 10000,
    history: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [250, 280, 300, 320, 310, 305, 300]
    }
  },
  activeUsers: {
    last24Hours: 5000,
    history: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [4800, 4900, 5100, 5000, 5200, 5100, 5000]
    }
  },
  revenue: {
    daily: 1500000,
    outstanding: 5000000,
    history: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [1400000, 1450000, 1520000, 1500000, 1550000, 1530000, 1500000]
    }
  },
  systemHealth: {
    history: {
      labels: Array.from({length: 24}, (_, i) => `${i}:00`),
      data: [
        300, 450, 600, 550, 700, 650, 800, 750, 900, 850, 0, 0, 
        0, 100, 250, 400, 550, 500, 450, 400, 350, 300, 250, 200
      ],
      status: [
        true, true, true, true, true, true, true, true, true, true, 
        false, false, false, true, true, true, true, true, true, true, true, true, true, true
      ]
    }
  },
  feedback: [
    { id: 1, user: "John D.", rating: 5, comment: "Great service! Very satisfied.", time: "2 minutes ago" },
    { id: 2, user: "Sarah M.", rating: 4, comment: "Good experience overall.", time: "15 minutes ago" },
    { id: 3, user: "Robert L.", rating: 3, comment: "Average service, could be better.", time: "1 hour ago" },
    { id: 4, user: "Emily K.", rating: 5, comment: "Excellent support team!", time: "2 hours ago" },
    { id: 5, user: "Michael P.", rating: 4, comment: "Very helpful staff.", time: "3 hours ago" },
  ],
  security: {
    adminSessions: [
      { admin: "Vivek", duration: "2h 15m" },
      { admin: "Nishikant", duration: "1h 30m" },
      { admin: "Rehan", duration: "45m" },
      { admin: "Rohit", duration: "3h" },
    ],
    incorrectLoginAttempts: 3
  },
  bugReports: [
    { id: 1, title: "Login page not loading", severity: "High", details: "Users unable to access the login page due to a 404 error.", reportedBy: "john@example.com" },
    { id: 2, title: "Appointment booking error", severity: "Medium", details: "Some users experiencing timeouts when trying to book appointments.", reportedBy: "sarah@example.com" },
    { id: 3, title: "Profile picture upload failing", severity: "Low", details: "Profile picture uploads are failing for PNG files larger than 2MB.", reportedBy: "mike@example.com" },
  ],
  supportRequests: [
    { id: 1, title: "How to update my availability?", type: "Doctor", details: "I'm unable to find the option to update my weekly availability. Please assist.", requestedBy: "dr.smith@example.com" },
    { id: 2, title: "Cannot view my test results", type: "Patient", details: "I've been notified that my test results are ready, but I can't access them on the portal.", requestedBy: "patient123@example.com" },
    { id: 3, title: "Adding new department to hospital profile", type: "Hospital", details: "We've opened a new department and need to add it to our hospital profile. How can we do this?", requestedBy: "cityhospital@example.com" },
  ]
};

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        borderDash: [2, 2]
      },
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 0,
    },
  },
};

const SystemHealthCard = () => {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">System Health</h3>
      <div style={{ height: '300px' }}>
        <Line
          data={{
            labels: mockData.systemHealth.history.labels,
            datasets: [{
              label: 'System Status',
              data: mockData.systemHealth.history.data.map((value, index) => ({
                x: mockData.systemHealth.history.labels[index],
                y: value,
                status: mockData.systemHealth.history.status[index]
              })),
              segment: {
                borderColor: ctx => mockData.systemHealth.history.status[ctx.p0DataIndex] ? 
                  'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
              },
              borderWidth: 2,
              tension: 0,
              pointRadius: 0,
              pointHoverRadius: 0,
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              intersect: false,
              mode: 'index'
            },
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: true,
                },
                ticks: {
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 12
                }
              },
              y: {
                grid: {
                  display: true,
                  drawBorder: true,
                  borderDash: [2],
                  color: 'rgba(0, 0, 0, 0.1)'
                },
                title: {
                  display: true,
                  text: 'Requests per Hour'
                },
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const status = context.raw.status ? 'Server Online' : 'Server Offline';
                    return `${status}: ${context.raw.y} requests`;
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [selectedBugReport, setSelectedBugReport] = useState(null);
  const [selectedSupportRequest, setSelectedSupportRequest] = useState(null);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h2>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SummaryCard
            icon={<FileText className="w-5 h-5 text-blue-500" />}
            title="Reports"
            mainValue={mockData.reports.last24Hours}
            subValue={mockData.reports.total}
            mainLabel="in past 24 hours"
            subLabel="total reports"
            chartData={mockData.reports.history}
            enableHover={true}
          />
          <SummaryCard
            icon={<Calendar className="w-5 h-5 text-green-500" />}
            title="Appointments"
            mainValue={mockData.appointments.last24Hours}
            subValue={mockData.appointments.total}
            mainLabel="in past 24 hours"
            subLabel="total appointments"
            chartData={mockData.appointments.history}
            enableHover={true}
          />
          <SummaryCard
            icon={<Users className="w-5 h-5 text-purple-500" />}
            title="Active Users"
            mainValue={mockData.activeUsers.last24Hours}
            mainLabel="in past 24 hours"
            chartData={mockData.activeUsers.history}
            enableHover={true}
          />
          <SummaryCard
            icon={<IndianRupee className="w-5 h-5 text-green-500" />}
            title="Revenue"
            mainValue={`₹${mockData.revenue.daily.toLocaleString()}`}
            subValue={`₹${mockData.revenue.outstanding.toLocaleString()}`}
            mainLabel="daily revenue"
            subLabel="outstanding payments"
            chartData={mockData.revenue.history}
            enableHover={false}
          />
        </div>

        {/* System Health and Security */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <SystemHealthCard />
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Security</h3>
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400">Admin Sessions</h4>
              {mockData.security.adminSessions.map((session, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{session.admin}</span>
                  <span className="text-gray-500 dark:text-gray-400">{session.duration}</span>
                </div>
              ))}
              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400">Security Alerts</h4>
                <p className="text-red-500">
                  {mockData.security.incorrectLoginAttempts} incorrect login attempts detected
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Recent Feedback</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {mockData.feedback.map((item) => (
              <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">{item.user}</p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < item.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{item.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bug Reports and Support Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-yellow-500" />
              Bug Reports
            </h3>
            <ul className="space-y-4">
              {mockData.bugReports.map(bug => (
                <li key={bug.id} className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded" onClick={() => setSelectedBugReport(bug)}>
                  <span className="text-gray-700 dark:text-gray-300">{bug.title}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    bug.severity === 'High' ? 'bg-red-100 text-red-800' :
                    bug.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {bug.severity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center">
              <HelpCircle className="w-6 h-6 mr-2 text-blue-500" />
              Customer Support Requests
            </h3>
            <ul className="space-y-4">
              {mockData.supportRequests.map(request => (
                <li key={request.id} className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded" onClick={() => setSelectedSupportRequest(request)}>
                  <span className="text-gray-700 dark:text-gray-300">{request.title}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    request.type === 'Doctor' ? 'bg-blue-100 text-blue-800' :
                    request.type === 'Patient' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {request.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bug Report Modal */}
      {selectedBugReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{selectedBugReport.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedBugReport.details}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Reported by: {selectedBugReport.reportedBy}</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setSelectedBugReport(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Support Request Modal */}
      {selectedSupportRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{selectedSupportRequest.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedSupportRequest.details}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Requested by: {selectedSupportRequest.requestedBy}</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setSelectedSupportRequest(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

const SummaryCard = ({ icon, title, mainValue, subValue, mainLabel, subLabel, chartData, enableHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovered && enableHover) {
      timer = setTimeout(() => {
        setShowChart(true);
      }, 3000);
    } else {
      setShowChart(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered, enableHover]);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-opacity duration-300 ${showChart ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center mb-2">
          {icon}
          <h3 className="text-sm font-semibold ml-2 text-gray-700 dark:text-gray-300">{title}</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{mainValue}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{mainLabel}</p>
        {subValue && (
          <>
            <p className="text-sm font-semibold mt-1 text-gray-700 dark:text-gray-300">{subValue}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{subLabel}</p>
          </>
        )}
      </div>
      {chartData && enableHover && (
        <div className={`absolute inset-0 transition-opacity duration-300 ${showChart ? 'opacity-100' : 'opacity-0'}`}>
          <Line
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  data: chartData.data,
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.5)',
                  fill: true,
                },
              ],
            }}
            options={lineChartOptions}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

