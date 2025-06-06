
export type UserRole = 'instructor' | 'student';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login: (name: string, role: UserRole) => void;
  logout: () => void;
  isInstructor: boolean;
  isStudent: boolean;
}
