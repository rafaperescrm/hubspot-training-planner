
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { BookOpen, Calendar, Clock, Users, Video, Search, Filter, LogOut, User } from 'lucide-react';
import { useLessons } from '../contexts/LessonContext';
import { useAuth } from '../contexts/AuthContext';
import { LessonCard } from './LessonCard';
import { AddLessonForm } from './AddLessonForm';
import { LessonCalendar } from './LessonCalendar';
import { LessonCategory, LessonStatus } from '../types/lesson';

export const Dashboard: React.FC = () => {
  const { lessons, getLessonsByStatus } = useLessons();
  const { user, logout, isInstructor, isStudent } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<LessonCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<LessonStatus | 'all'>('all');

  // Estatísticas
  const totalLessons = lessons.length;
  const completedLessons = getLessonsByStatus('completed').length;
  const scheduledLessons = getLessonsByStatus('scheduled').length;
  const plannedLessons = getLessonsByStatus('planned').length;
  const totalDurationMinutes = lessons.reduce((acc, lesson) => acc + lesson.duration, 0);
  const lessonsWithVideo = lessons.filter(lesson => lesson.videoLink).length;

  // Filtros
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || lesson.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || lesson.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categoryOptions = {
    all: 'Todas as categorias',
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
    all: 'Todos os status',
    planned: 'Planejada',
    scheduled: 'Agendada',
    completed: 'Concluída',
    cancelled: 'Cancelada'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hubspot-light to-white">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold hubspot-gradient bg-clip-text text-transparent">
                HubSpot Training Center
              </h1>
              <p className="text-muted-foreground mt-1">
                {isInstructor ? 'Gerencie seus treinamentos de CRM HubSpot' : 'Acesse seus treinamentos de CRM HubSpot'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
                <Badge variant={isInstructor ? 'default' : 'secondary'}>
                  {isInstructor ? 'Instrutor' : 'Aluno'}
                </Badge>
              </div>
              {isInstructor && <AddLessonForm />}
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="animate-slide-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-hubspot-orange/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-hubspot-orange" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalLessons}</p>
                  <p className="text-sm text-muted-foreground">Total de Aulas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedLessons}</p>
                  <p className="text-sm text-muted-foreground">Concluídas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{scheduledLessons}</p>
                  <p className="text-sm text-muted-foreground">Agendadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {totalDurationMinutes >= 60 
                      ? `${Math.floor(totalDurationMinutes / 60)}h ${totalDurationMinutes % 60}min`
                      : `${totalDurationMinutes}min`
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">Duração Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Video className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{lessonsWithVideo}</p>
                  <p className="text-sm text-muted-foreground">Com Vídeo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="lessons" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="lessons">Lista de Aulas</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar aulas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryOptions).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusOptions).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de aulas */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLessons.map((lesson, index) => (
                <div key={lesson.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <LessonCard lesson={lesson} />
                </div>
              ))}
            </div>

            {filteredLessons.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma aula encontrada</h3>
                  <p className="text-muted-foreground mb-4">
                    {isInstructor ? 
                      'Tente ajustar os filtros ou criar uma nova aula.' : 
                      'Tente ajustar os filtros para encontrar as aulas disponíveis.'
                    }
                  </p>
                  {isInstructor && <AddLessonForm />}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <LessonCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
