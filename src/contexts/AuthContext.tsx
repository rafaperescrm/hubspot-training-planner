
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, role: UserRole) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      role
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const isInstructor = user?.role === 'instructor';
  const isStudent = user?.role === 'student';

  const value: AuthContextType = {
    user,
    login,
    logout,
    isInstructor,
    isStudent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
