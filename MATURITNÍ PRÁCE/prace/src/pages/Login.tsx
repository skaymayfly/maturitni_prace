import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoleSelector from '../components/auth/RoleSelector';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [role, setRole] = useState<'student' | 'landlord'>('student');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = (email: string, password: string) => {
    // In a real app, you would validate credentials with your backend
    const mockUser = {
      id: '1',
      name: 'Jan Novák',
      email: email,
      role: role,
      university: 'ČVUT',
      interests: ['sport', 'cestování'],
      bio: 'Student informatiky hledající spolubydlící.'
    };

    login(mockUser);
    const from = (location.state as any)?.from?.pathname || '/';
    navigate(from);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Přihlášení</h1>
        <RoleSelector role={role} onRoleChange={setRole} />
        <LoginForm onSubmit={handleLogin} />
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Zapomenuté heslo?
          </a>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Nemáte účet?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Zaregistrujte se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}