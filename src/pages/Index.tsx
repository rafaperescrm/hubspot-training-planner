
import React from 'react';
import { Dashboard } from '../components/Dashboard';
import { LessonProvider } from '../contexts/LessonContext';

const Index = () => {
  return (
    <LessonProvider>
      <Dashboard />
    </LessonProvider>
  );
};

export default Index;
