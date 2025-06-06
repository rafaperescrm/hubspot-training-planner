
export interface Lesson {
  id: string;
  title: string;
  description: string;
  date: Date | null;
  videoLink: string;
  duration: number; // em minutos
  category: LessonCategory;
  status: LessonStatus;
  attendees?: string[];
  materials?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type LessonCategory = 
  | 'contacts'
  | 'deals'
  | 'companies'
  | 'tickets'
  | 'reports'
  | 'automation'
  | 'sales'
  | 'marketing'
  | 'service'
  | 'general';

export type LessonStatus = 'planned' | 'scheduled' | 'completed' | 'cancelled';

export interface LessonContextType {
  lessons: Lesson[];
  addLesson: (lesson: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLesson: (id: string, lesson: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
  getLessonsByStatus: (status: LessonStatus) => Lesson[];
  getLessonsByCategory: (category: LessonCategory) => Lesson[];
}
