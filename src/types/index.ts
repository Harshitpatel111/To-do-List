export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  date?: string; // Optional date property
}

export interface Statistics {
  total: number;
  completed: number;
  pending: number;
}