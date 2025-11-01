import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getStatusVariant = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'planning': return 'info';
      case 'on-hold': return 'warning';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  return (
    <Card padding="lg" hover onClick={onClick} className="relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 90 }}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{project.name}</h3>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </motion.button>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

      <div className="flex items-center justify-between mb-4">
        <Badge variant={getStatusVariant(project.status)}>
          {project.status.replace('-', ' ')}
        </Badge>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-full"
        >
          {project.progress}%
        </motion.span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${project.progress}%` }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="h-3 rounded-full shadow-sm"
          style={{ backgroundColor: project.color }}
        />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{format(project.endDate, 'MMM dd')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{project.team.length}</span>
          </div>
        </div>

        <motion.div 
          className="flex -space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          {project.team.slice(0, 3).map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              className="relative"
            >
              <Avatar
                src={member.avatar}
                alt={member.name}
                size="sm"
                className="border-2 border-white shadow-sm"
              />
            </motion.div>
          ))}
          {project.team.length > 3 && (
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white flex items-center justify-center shadow-sm"
            >
              <span className="text-xs font-medium text-gray-600">
                +{project.team.length - 3}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Card>
  );
};

export default ProjectCard;