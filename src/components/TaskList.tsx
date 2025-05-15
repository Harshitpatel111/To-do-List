import React, { useState } from 'react';
import { CheckCircle, Circle, Plus, Trash2, Edit3, Check, X, Calendar } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

interface TaskListProps {
  className?: string;
}

const TaskList: React.FC<TaskListProps> = ({ className }) => {
  const { filteredTasks, addTask, toggleTaskCompletion, deleteTask, filterType, setFilterType } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim(), newTaskDate); // Pass the date
      setNewTaskTitle('');
      setNewTaskDate(''); // Reset the date input
    }
  };

  const startEditingTask = (taskId: string, currentTitle: string) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(currentTitle);
  };

  const saveEditedTask = () => {
    if (editedTaskTitle.trim()) {
      toggleTaskCompletion(editingTaskId!); // Replace with actual update logic
      setEditingTaskId(null);
      setEditedTaskTitle('');
    }
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };

  return (
    <div className={`task-list ${className} bg-white dark:bg-[#1e293b] rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out`}>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Tasks</h2>
      
      <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 font-medium ${
            filterType === 'all'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterType('pending')}
          className={`px-4 py-2 font-medium ${
            filterType === 'pending'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterType('completed')}
          className={`px-4 py-2 font-medium ${
            filterType === 'completed'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Completed
        </button>
      </div>
      
      <form onSubmit={handleAddTask} className="flex mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="date"
          value={newTaskDate}
          onChange={(e) => setNewTaskDate(e.target.value)}
          className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>
      
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No tasks available. Add some tasks to get started!
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-md dark:border-gray-700 group hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              {editingTaskId === task.id ? (
                <div className="flex-grow flex items-center space-x-2">
                  <input
                    type="text"
                    value={editedTaskTitle}
                    onChange={(e) => setEditedTaskTitle(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    onClick={saveEditedTask}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={cancelEditingTask}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex-grow flex items-center space-x-3">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="focus:outline-none"
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400 hover:text-blue-500" />
                    )}
                  </button>
                  <span
                    className={`${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : 'text-gray-800 dark:text-white'
                    }`}
                  >
                    {task.title}
                  </span>
                  {task.date && (
                    <span className="flex items-center text-sm text-gray-500 dark:text-gray-400 ml-2">
                      <Calendar className="mr-1 text-gray-400 dark:text-gray-500" />
                      {new Date(task.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              )}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => startEditingTask(task.id, task.title)}
                  className="text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                >
                  <Edit3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;