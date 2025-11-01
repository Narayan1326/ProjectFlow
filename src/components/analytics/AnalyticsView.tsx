import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Clock, Target, Award } from 'lucide-react';
import Card from '../ui/Card';
import BackButton from '../ui/BackButton';
import { mockProjects, mockTasks, mockUsers } from '../../data/mockData';

interface AnalyticsViewProps {
  onBack: () => void;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onBack }) => {
  // Calculate analytics data
  const totalProjects = mockProjects.length;
  const activeProjects = mockProjects.filter(p => p.status === 'active').length;
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;
  const totalTasks = mockTasks.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);
  const teamSize = mockUsers.length;

  const projectStatusData = [
    { status: 'Active', count: mockProjects.filter(p => p.status === 'active').length, color: '#10b981' },
    { status: 'Planning', count: mockProjects.filter(p => p.status === 'planning').length, color: '#3b82f6' },
    { status: 'On Hold', count: mockProjects.filter(p => p.status === 'on-hold').length, color: '#f59e0b' },
    { status: 'Completed', count: mockProjects.filter(p => p.status === 'completed').length, color: '#8b5cf6' },
  ];

  const taskPriorityData = [
    { priority: 'Urgent', count: mockTasks.filter(t => t.priority === 'urgent').length, color: '#ef4444' },
    { priority: 'High', count: mockTasks.filter(t => t.priority === 'high').length, color: '#f59e0b' },
    { priority: 'Medium', count: mockTasks.filter(t => t.priority === 'medium').length, color: '#3b82f6' },
    { priority: 'Low', count: mockTasks.filter(t => t.priority === 'low').length, color: '#10b981' },
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: string;
    icon: React.ElementType;
    color: string;
  }> = ({ title, value, change, icon: Icon, color }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {change && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-opacity-10`} style={{ backgroundColor: color + '20' }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </Card>
  );

  const ChartCard: React.FC<{
    title: string;
    data: Array<{ status?: string; priority?: string; count: number; color: string }>;
  }> = ({ title, data }) => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => {
          const label = item.status || item.priority || '';
          const maxCount = Math.max(...data.map(d => d.count));
          const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
          
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-16 text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <div className="w-8 text-sm font-medium text-gray-900 dark:text-white">
                {item.count}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );

  return (
    <div className="p-6">
      <BackButton onClick={onBack} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your project performance and team productivity</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Projects"
          value={totalProjects}
          change="+12% from last month"
          icon={Target}
          color="#3b82f6"
        />
        <StatCard
          title="Active Projects"
          value={activeProjects}
          change="+8% from last month"
          icon={BarChart3}
          color="#10b981"
        />
        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          change="+15% from last month"
          icon={Award}
          color="#8b5cf6"
        />
        <StatCard
          title="Team Members"
          value={teamSize}
          change="+2 new members"
          icon={Users}
          color="#f59e0b"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Projects by Status" data={projectStatusData} />
        <ChartCard title="Tasks by Priority" data={taskPriorityData} />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Progress</h3>
          <div className="space-y-4">
            {mockProjects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {project.name}
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Performance</h3>
          <div className="space-y-4">
            {mockUsers.slice(0, 4).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {Math.floor(Math.random() * 20) + 5} tasks completed
                  </p>
                </div>
                <div className="text-sm font-bold text-green-600 dark:text-green-400">
                  {Math.floor(Math.random() * 30) + 70}%
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Project created', time: '2 hours ago', color: '#10b981' },
              { action: 'Task completed', time: '4 hours ago', color: '#3b82f6' },
              { action: 'Team member added', time: '1 day ago', color: '#8b5cf6' },
              { action: 'Milestone reached', time: '2 days ago', color: '#f59e0b' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: activity.color }}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsView;