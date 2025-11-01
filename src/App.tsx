import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, AuthContext } from './components/auth/AuthProvider';
import AuthPage from './components/auth/AuthPage';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import ProjectsView from './components/projects/ProjectsView';
import TasksView from './components/tasks/TasksView';
import TeamView from './components/team/TeamView';
import CalendarView from './components/calendar/CalendarView';
import AnalyticsView from './components/analytics/AnalyticsView';
import SettingsView from './components/settings/SettingsView';
import NewProjectModal from './components/modals/NewProjectModal';
import NewTaskModal from './components/modals/NewTaskModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Project, Task } from './types';
import { mockProjects, mockTasks, mockUsers } from './data/mockData';

const AppContent: React.FC = () => {
  const [user, setUser] = useLocalStorage('auth_user', null);
  const [users, setUsers] = useLocalStorage('registered_users', []);
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', mockProjects);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', mockTasks);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = users.find((u: any) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = users.find((u: any) => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role: 'member',
      createdAt: new Date(),
    };

    setUsers([...users, newUser]);
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  const handleNewProject = (projectData: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    color: string;
  }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.name,
      description: projectData.description,
      status: 'planning',
      progress: 0,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
      team: [mockUsers[0]], // Current user
      tasks: [],
      color: projectData.color,
    };
    
    setProjects([...projects, newProject]);
  };

  const handleNewTask = (taskData: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    assigneeId?: string;
    dueDate?: Date;
    projectId: string;
  }) => {
    const assignee = taskData.assigneeId 
      ? mockUsers.find(u => u.id === taskData.assigneeId)
      : undefined;

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      status: 'todo',
      priority: taskData.priority,
      assignee,
      dueDate: taskData.dueDate,
      projectId: taskData.projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTasks([...tasks, newTask]);
  };

  if (!user) {
    return (
      <AuthPage
        onLogin={login}
        onRegister={register}
        isLoading={isLoading}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectsView />;
      case 'tasks':
        return <TasksView />;
      case 'team':
        return <TeamView onBack={() => setActiveTab('dashboard')} />;
      case 'calendar':
        return <CalendarView onBack={() => setActiveTab('dashboard')} />;
      case 'analytics':
        return <AnalyticsView onBack={() => setActiveTab('dashboard')} />;
      case 'settings':
        return <SettingsView onBack={() => setActiveTab('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onNewProject={() => setShowNewProjectModal(true)}
          onNewTask={() => setShowNewTaskModal(true)}
          onLogout={logout}
        />
        
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Modals */}
      <NewProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onSubmit={handleNewProject}
      />
      
      <NewTaskModal
        isOpen={showNewTaskModal}
        onClose={() => setShowNewTaskModal(false)}
        onSubmit={handleNewTask}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;