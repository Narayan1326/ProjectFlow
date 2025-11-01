export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'member';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  progress: number;
  startDate: Date;
  endDate: Date;
  team: User[];
  tasks: Task[];
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: User;
  dueDate?: Date;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  type: 'task_created' | 'task_updated' | 'project_created' | 'user_joined';
  message: string;
  user: User;
  timestamp: Date;
  projectId?: string;
  taskId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'member';
  createdAt: Date;
}

export interface TeamMember extends User {
  joinedAt: Date;
  lastActive: Date;
  projectsCount: number;
  tasksCompleted: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  type: 'deadline' | 'meeting' | 'milestone';
  projectId?: string;
  taskId?: string;
}