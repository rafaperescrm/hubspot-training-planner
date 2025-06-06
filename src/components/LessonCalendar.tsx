
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLessons } from '../contexts/LessonContext';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export const LessonCalendar: React.FC = () => {
  const { lessons } = useLessons();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  // Filtra aulas da data selecionada
  const lessonsForSelectedDate = selectedDate 
    ? lessons.filter(lesson => lesson.date && isSameDay(lesson.date, selectedDate))
    : [];

  // Dates com aulas agendadas
  const datesWithLessons = lessons
    .filter(lesson => lesson.date)
    .map(lesson => lesson.date!);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Calendário de Aulas</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border p-3 pointer-events-auto"
            modifiers={{
              hasLesson: datesWithLessons
            }}
            modifiersStyles={{
              hasLesson: { 
                backgroundColor: 'hsl(var(--hubspot-orange))', 
                color: 'white',
                fontWeight: 'bold'
              }
            }}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-hubspot-orange"></div>
              <span>Dias com aulas agendadas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {selectedDate ? format(selectedDate, "dd 'de' MMMM, yyyy", { locale: ptBR }) : 'Selecione uma data'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lessonsForSelectedDate.length > 0 ? (
            <div className="space-y-4">
              {lessonsForSelectedDate.map(lesson => (
                <div key={lesson.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{lesson.title}</h4>
                    <Badge className={cn('text-xs', statusColors[lesson.status])}>
                      {statusLabels[lesson.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{lesson.date && format(lesson.date, 'HH:mm')}</span>
                    <span>{lesson.duration} min</span>
                  </div>
                  {lesson.videoLink && (
                    <a 
                      href={lesson.videoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-hubspot-blue hover:underline"
                    >
                      Ver gravação →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma aula agendada para esta data.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
