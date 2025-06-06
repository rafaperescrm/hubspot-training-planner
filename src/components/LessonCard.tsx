
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Video, Clock, Users } from 'lucide-react';
import { Lesson } from '../types/lesson';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { EditLessonDialog } from './EditLessonDialog';

interface LessonCardProps {
  lesson: Lesson;
}

const categoryColors = {
  contacts: 'bg-blue-100 text-blue-800',
  deals: 'bg-green-100 text-green-800',
  companies: 'bg-purple-100 text-purple-800',
  tickets: 'bg-yellow-100 text-yellow-800',
  reports: 'bg-red-100 text-red-800',
  automation: 'bg-indigo-100 text-indigo-800',
  sales: 'bg-orange-100 text-orange-800',
  marketing: 'bg-pink-100 text-pink-800',
  service: 'bg-teal-100 text-teal-800',
  general: 'bg-gray-100 text-gray-800'
};

const statusColors = {
  planned: 'bg-gray-100 text-gray-800',
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusLabels = {
  planned: 'Planejada',
  scheduled: 'Agendada',
  completed: 'Concluída',
  cancelled: 'Cancelada'
};

const categoryLabels = {
  contacts: 'Contatos',
  deals: 'Negócios',
  companies: 'Empresas',
  tickets: 'Tickets',
  reports: 'Relatórios',
  automation: 'Automação',
  sales: 'Vendas',
  marketing: 'Marketing',
  service: 'Atendimento',
  general: 'Geral'
};

export const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {lesson.title}
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={cn('text-xs', statusColors[lesson.status])}>
                {statusLabels[lesson.status]}
              </Badge>
              <Badge variant="outline" className={cn('text-xs', categoryColors[lesson.category])}>
                {categoryLabels[lesson.category]}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{lesson.description}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {lesson.date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(lesson.date, "dd 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR })}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{lesson.duration} min</span>
            </div>
            
            {lesson.attendees && lesson.attendees.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{lesson.attendees.length} participante(s)</span>
              </div>
            )}
          </div>

          {lesson.videoLink && (
            <div className="flex items-center gap-2 p-3 bg-hubspot-light rounded-lg">
              <Video className="h-4 w-4 text-hubspot-orange" />
              <a 
                href={lesson.videoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-hubspot-blue hover:underline font-medium"
              >
                Assistir gravação
              </a>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditOpen(true)}
              className="flex-1"
            >
              Editar
            </Button>
            {lesson.videoLink && (
              <Button 
                size="sm" 
                onClick={() => window.open(lesson.videoLink, '_blank')}
                className="flex-1 hubspot-gradient text-white hover:opacity-90"
              >
                <Video className="h-4 w-4 mr-2" />
                Assistir
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <EditLessonDialog 
        lesson={lesson}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
};
