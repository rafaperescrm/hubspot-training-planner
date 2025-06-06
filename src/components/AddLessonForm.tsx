
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { LessonCategory, LessonStatus } from '../types/lesson';
import { useLessons } from '../contexts/LessonContext';
import { useForm } from 'react-hook-form';

const categoryOptions = {
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

const statusOptions = {
  planned: 'Planejada',
  scheduled: 'Agendada',
  completed: 'Concluída',
  cancelled: 'Cancelada'
};

export const AddLessonForm: React.FC = () => {
  const { addLesson } = useLessons();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      videoLink: '',
      duration: 60,
      category: 'general' as LessonCategory,
      status: 'planned' as LessonStatus,
      attendees: ''
    }
  });

  const onSubmit = (data: any) => {
    addLesson({
      ...data,
      date: selectedDate || null,
      attendees: data.attendees ? data.attendees.split(',').map((name: string) => name.trim()).filter(Boolean) : [],
      materials: []
    });
    
    reset();
    setSelectedDate(undefined);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hubspot-gradient text-white hover:opacity-90 shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Nova Aula
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Aula</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título da Aula *</Label>
              <Input
                id="title"
                {...register('title', { required: true })}
                placeholder="Ex: Introdução ao HubSpot"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duração (minutos) *</Label>
              <Input
                id="duration"
                type="number"
                {...register('duration', { required: true, min: 1 })}
                placeholder="60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Descreva o conteúdo da aula..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select 
                value={watch('category')} 
                onValueChange={(value: LessonCategory) => setValue('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryOptions).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status *</Label>
              <Select 
                value={watch('status')} 
                onValueChange={(value: LessonStatus) => setValue('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusOptions).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Data e Hora</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP 'às' HH:mm", { locale: ptBR }) : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
                {selectedDate && (
                  <div className="p-3 border-t">
                    <Label className="text-sm">Horário</Label>
                    <Input
                      type="time"
                      value={selectedDate ? format(selectedDate, 'HH:mm') : ''}
                      onChange={(e) => {
                        if (selectedDate && e.target.value) {
                          const [hours, minutes] = e.target.value.split(':');
                          const newDate = new Date(selectedDate);
                          newDate.setHours(parseInt(hours), parseInt(minutes));
                          setSelectedDate(newDate);
                        }
                      }}
                      className="mt-1"
                    />
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoLink">Link do Vídeo</Label>
            <Input
              id="videoLink"
              {...register('videoLink')}
              placeholder="https://..."
              type="url"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees">Participantes (separados por vírgula)</Label>
            <Input
              id="attendees"
              {...register('attendees')}
              placeholder="João Silva, Maria Santos..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="hubspot-gradient text-white">
              Criar Aula
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
