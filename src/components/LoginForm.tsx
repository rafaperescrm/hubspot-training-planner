
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Users, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim(), role);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hubspot-light to-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-hubspot-orange/10 rounded-lg w-fit">
            <BookOpen className="h-8 w-8 text-hubspot-orange" />
          </div>
          <CardTitle className="text-2xl font-bold hubspot-gradient bg-clip-text text-transparent">
            HubSpot Training Center
          </CardTitle>
          <p className="text-muted-foreground">
            Acesse o sistema de treinamentos
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Seu Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Acesso</Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instructor">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Instrutor (Edição completa)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="student">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Aluno (Apenas visualização)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full hubspot-gradient text-white">
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <div className="space-y-2">
              <p><strong>Instrutor:</strong> Pode criar, editar e excluir aulas</p>
              <p><strong>Aluno:</strong> Pode apenas visualizar e assistir aulas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
