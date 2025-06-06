
import React from 'react';
import { Dashboard } from '../components/Dashboard';
import { LoginForm } from '../components/LoginForm';
import { LessonProvider } from '../contexts/LessonContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <LessonProvider>
      <Dashboard />
    </LessonProvider>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
