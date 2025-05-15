import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../types';
import { mockTasks } from '../data/mockData';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  filterType: 'all' | 'completed' | 'pending';
  setFilterType: (type: 'all' | 'completed' | 'pending') => void;
  filteredTasks: Task[];
  statistics: {
    total: number;
    completed: number;
    pending: number;
  };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : mockTasks;
  });

  const [filterType, setFilterType] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterType === 'all') return true;
    if (filterType === 'completed') return task.completed;
    if (filterType === 'pending') return !task.completed;
    return true;
  });

  const statistics = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTaskCompletion,
        deleteTask,
        filterType,
        setFilterType,
        filteredTasks,
        statistics,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};