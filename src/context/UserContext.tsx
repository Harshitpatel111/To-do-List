import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { mockUser } from '../data/mockData';

interface UserContextType {
  user: User;
  updateUser: (userData: Partial<User>) => void;
  isEditingProfile: boolean;
  setIsEditingProfile: (isEditing: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUser = {
  name: 'Harshit Bhuva',
  email: 'harshit.bhuva@gmail.com',
  avatar: '/src/assets/aa.jpg',
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : initialUser;
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const updateUser = (userData: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...userData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isEditingProfile, setIsEditingProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};