import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Kanban, List } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import TaskCard from './TaskCard';
import { Task } from '../../types';

interface TasksViewProps {
  tasks: any[];
  onNewTask: () => void;
  users: any[];
}

const TasksView: React.FC<TasksViewProps> = ({ tasks, onNewTask, users }) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesFilter;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    review: filteredTasks.filter(task => task.status === 'review'),
    completed: filteredTasks.filter(task => task.status === 'completed'),
  };

  const KanbanColumn: React.FC<{ status: Task['status'], tasks: Task[], title: string }> = 
    ({ status, tasks, title }) => (
      <Card className="p-4 min-h-[500px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              status === 'todo' ? 'bg-gray-400' :
              status === 'in-progress' ? 'bg-primary-500' :
              status === 'review' ? 'bg-warning-500' :
              'bg-accent-500'
            }`} />
            {title}
          </h3>
          <motion.span 
            key={tasks.length}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium shadow-sm"
          >
            {tasks.length}
          </motion.span>
        </div>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
          {tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-400"
            >
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <div className="w-6 h-6 border-2 border-dashed border-gray-300 rounded" />
              </div>
              <p className="text-sm">No tasks</p>
            </motion.div>
          )}
        </div>
      </Card>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage and track all your tasks</p>
        </div>
        <Button icon={Plus} size="md" onClick={onNewTask}>
          New Task
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="input-field"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('kanban')}
              className={`p-3 rounded-lg transition-all duration-200 ${
                viewMode === 'kanban'
                  ? 'bg-primary-100 text-primary-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Kanban className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </Card>

      {/* Tasks View */}
      <AnimatePresence mode="wait">
        {viewMode === 'kanban' ? (
          <Card padding="md" className="min-h-[500px] bg-gradient-to-b from-white to-gray-50">
            <motion.div
              key="kanban"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <KanbanColumn status="todo" tasks={tasksByStatus.todo} title="To Do" />
              <KanbanColumn status="in-progress" tasks={tasksByStatus['in-progress']} title="In Progress" />
              <KanbanColumn status="review" tasks={tasksByStatus.review} title="Review" />
              <KanbanColumn status="completed" tasks={tasksByStatus.completed} title="Completed" />
            </motion.div>
          </Card>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksView;