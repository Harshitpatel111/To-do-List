import { Task, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete dashboard design',
    completed: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: '2',
    title: 'Implement user authentication',
    completed: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '3',
    title: 'Create responsive layout',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '4',
    title: 'Add dark mode support',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Integrate with API',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];