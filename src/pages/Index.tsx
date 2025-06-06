import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';

// Funções de ícones (copiadas da sua estrutura original)
function CalendarDaysIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

// 1. Conexão com o Supabase
const supabaseUrl = 'https://djvbwyyjbwqootdlqmrq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdmJ3eXlqYndxb290ZGxxbXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5ODAzNTUsImV4cCI6MjA2NDU1NjM1NX0.i0EZm0AVXqPoLxEPf_Cs6xfziam3--Ou71KcNsJAL0M';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Index() {
  
  // 2. Estados para guardar a permissão e o status de carregamento
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. Código que roda quando a página carrega para verificar o login
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Se não há ninguém logado, redireciona para a página de login
        // O caminho precisa incluir o nome do repositório para funcionar no GitHub Pages
        window.location.replace('/hubspot-training-planne/login.html');
      } else {
        // Se há alguém logado, guarda a permissão e finaliza o carregamento
        setUserRole(session.user.role);
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Enquanto verifica as informações, não mostra nada
  if (loading) {
    return <div className="bg-gray-50 min-h-screen"></div>;
  }

  // A partir daqui, é o visual da sua página que já existia
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Gerencie seus treinamentos de CRM Hubspot</h1>
          
          {/* O botão "Nova Aula" SÓ aparece se a permissão for 'admin' */}
          {userRole === 'admin' && (
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Nova Aula
            </Button>
          )}

        </header>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Visão Geral</h2>
              <div className="space-y-4">
                <Card><CardHeader><CardTitle className="text-sm font-medium text-gray-500">Total de Aulas</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">3</p></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-sm font-medium text-gray-500">Concluídas</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">1</p></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-sm font-medium text-gray-500">Agendadas</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">1</p></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-sm font-medium text-gray-500">Duração Total</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">4h 30min</p></CardContent></Card>
              </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Calendário</h2>
              <Calendar className="w-full" />
            </div>
          </aside>
          <main className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Lista de Aulas</h2>
              <div className="flex items-center space-x-4">
                <Input placeholder="Buscar aulas..." className="w-64" />
                <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Categorias</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuCheckboxItem>HubSpot</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem>Vendas</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem>Marketing</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu>
                <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Status</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuCheckboxItem>Agendada</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem>Concluída</DropdownMenuCheckboxItem><DropdownMenuCheckboxItem>Planejada</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Introdução ao HubSpot CRM</CardTitle><CardDescription className="flex items-center space-x-4 text-sm text-gray-500"><span className="text-green-600 font-semibold">Concluída</span><span><CalendarDaysIcon className="w-4 h-4 inline-block mr-1" />10 de Junho, 2024 às 10:00</span><span>60 min</span></CardDescription></CardHeader>
                <CardContent><p className="text-sm text-gray-600">Visão geral da plataforma e principais funcionalidades.</p><div className="mt-4"><span className="font-semibold">2</span><span className="text-sm text-gray-500"> participante(s)</span></div></CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Assistir gravação</Button>
                  {/* O botão "Editar" SÓ aparece se a permissão for 'admin' */}
                  {userRole === 'admin' && <Button>Editar</Button>}
                </CardFooter>
              </Card>
              <Card>
                <CardHeader><CardTitle>Gestão de Contatos</CardTitle><CardDescription className="flex items-center space-x-4 text-sm text-gray-500"><span className="text-blue-600 font-semibold">Agendada</span><span><CalendarDaysIcon className="w-4 h-4 inline-block mr-1" />15 de Junho, 2024 às 14:00</span><span>90 min</span></CardDescription></CardHeader>
                <CardContent><p className="text-sm text-gray-600">Como criar, organizar e segmentar contatos no HubSpot.</p><div className="mt-4"><span className="font-semibold">2</span><span className="text-sm text-gray-500"> participante(s)</span></div></CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Assistir</Button>
                  {/* O botão "Editar" SÓ aparece se a permissão for 'admin' */}
                  {userRole === 'admin' && <Button>Editar</Button>}
                </CardFooter>
              </Card>
              <Card>
                <CardHeader><CardTitle>Pipeline de Vendas</CardTitle><CardDescription className="flex items-center space-x-4 text-sm text-gray-500"><span className="text-yellow-600 font-semibold">Planejada</span><span>120 min</span></CardDescription></CardHeader>
                <CardContent><p className="text-sm text-gray-600">Configuração e gestão de deals no pipeline.</p></CardContent>
                <CardFooter className="flex justify-end">
                  {/* O botão "Editar" SÓ aparece se a permissão for 'admin' */}
                  {userRole === 'admin' && <Button>Editar</Button>}
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
