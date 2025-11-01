import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flag, User } from 'lucide-react';
import { format } from 'date-fns';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const getStatusVariant = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'review': return 'warning';
      case 'todo': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-error-500';
      case 'high': return 'text-warning-500';
      case 'medium': return 'text-primary-500';
      case 'low': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card padding="md" hover onClick={onClick} className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors flex-1">{task.title}</h3>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 15 }}
          className="ml-2"
        >
          <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
        </motion.div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between mb-3">
        <Badge variant={getStatusVariant(task.status)}>
          {task.status.replace('-', ' ')}
        </Badge>
        <Badge variant="default" size="sm" className="capitalize font-medium">
          {task.priority}
        </Badge>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-3">
          {task.dueDate && (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full"
            >
              <Calendar className="w-4 h-4" />
              <span>{format(task.dueDate, 'MMM dd')}</span>
            </motion.div>
          )}
          {task.assignee && (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Avatar
                src={task.assignee.avatar}
                alt={task.assignee.name}
                size="sm"
                className="shadow-sm"
              />
              <span className="text-xs">{task.assignee.name.split(' ')[0]}</span>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;