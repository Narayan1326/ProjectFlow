import React from 'react';
import { motion } from 'framer-motion';
import {
  FolderOpen,
  CheckSquare,
  Users,
  Clock,
} from 'lucide-react';
import StatsCard from './StatsCard';
import ProjectCard from './ProjectCard';
import ActivityFeed from './ActivityFeed';
interface DashboardProps {
  projects: any[];
  tasks: any[];
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, tasks, user }) => {
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const teamMembers = 1;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Active Projects"
            value={activeProjects}
            change={12}
            icon={FolderOpen}
            color="text-primary-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Total Tasks"
            value={totalTasks}
            change={8}
            icon={CheckSquare}
            color="text-secondary-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Completed Tasks"
            value={completedTasks}
            change={15}
            icon={Clock}
            color="text-accent-500"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Team Members"
            value={teamMembers}
            change={5}
            icon={Users}
            color="text-warning-500"
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Overview */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              View all
            </button>
          </div>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {projects.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-gray-500">
                <p>No projects yet. Create your first project to get started!</p>
              </div>
            ) : (
              projects.slice(0, 4).map((project) => (
              <motion.div key={project.id} variants={item}>
                <ProjectCard project={project} />
              </motion.div>
            ))
            )}
          </motion.div>
        </div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ActivityFeed />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;