
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lesson, LessonContextType, LessonStatus, LessonCategory } from '../types/lesson';
import { toast } from '@/hooks/use-toast';

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const useLessons = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLessons must be used within a LessonProvider');
  }
  return context;
};

interface LessonProviderProps {
  children: ReactNode;
}

export const LessonProvider: React.FC<LessonProviderProps> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Introdução ao HubSpot CRM',
      description: 'Visão geral da plataforma e principais funcionalidades',
      date: new Date('2024-06-10T10:00:00'),
      videoLink: 'https://exemplo.com/video1',
      duration: 60,
      category: 'general',
      status: 'completed',
      attendees: ['João Silva', 'Maria Santos'],
      materials: ['Slides de introdução', 'Guia rápido'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Gestão de Contatos',
      description: 'Como criar, organizar e segmentar contatos no HubSpot',
      date: new Date('2024-06-15T14:00:00'),
      videoLink: 'https://exemplo.com/video2',
      duration: 90,
      category: 'contacts',
      status: 'scheduled',
      attendees: ['Pedro Costa', 'Ana Lima'],
      materials: ['Manual de contatos', 'Templates'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Pipeline de Vendas',
      description: 'Configuração e gestão de deals no pipeline',
      date: null,
      videoLink: '',
      duration: 120,
      category: 'deals',
      status: 'planned',
      attendees: [],
      materials: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const addLesson = (lessonData: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setLessons(prev => [...prev, newLesson]);
    toast({
      title: "Aula adicionada!",
      description: `A aula "${newLesson.title}" foi criada com sucesso.`,
    });
  };

  const updateLesson = (id: string, lessonData: Partial<Lesson>) => {
    setLessons(prev => prev.map(lesson => 
      lesson.id === id 
        ? { ...lesson, ...lessonData, updatedAt: new Date() }
        : lesson
    ));
    toast({
      title: "Aula atualizada!",
      description: "As informações da aula foram atualizadas com sucesso.",
    });
  };

  const deleteLesson = (id: string) => {
    setLessons(prev => prev.filter(lesson => lesson.id !== id));
    toast({
      title: "Aula removida!",
      description: "A aula foi removida do seu planejamento.",
    });
  };

  const getLessonsByStatus = (status: LessonStatus) => {
    return lessons.filter(lesson => lesson.status === status);
  };

  const getLessonsByCategory = (category: LessonCategory) => {
    return lessons.filter(lesson => lesson.category === category);
  };

  const value: LessonContextType = {
    lessons,
    addLesson,
    updateLesson,
    deleteLesson,
    getLessonsByStatus,
    getLessonsByCategory
  };

  return (
    <LessonContext.Provider value={value}>
      {children}
    </LessonContext.Provider>
  );
};
