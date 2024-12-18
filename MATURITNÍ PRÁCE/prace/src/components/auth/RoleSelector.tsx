import React from 'react';
import { UserCircle, Home } from 'lucide-react';

interface RoleSelectorProps {
  role: 'student' | 'landlord';
  onRoleChange: (role: 'student' | 'landlord') => void;
}

export default function RoleSelector({ role, onRoleChange }: RoleSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Vyberte roli:</label>
      <div className="grid grid-cols-2 gap-4">
        <button
          className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
            role === 'student'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onRoleChange('student')}
        >
          <UserCircle className="h-6 w-6" />
          <span>Student</span>
        </button>
        <button
          className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
            role === 'landlord'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onRoleChange('landlord')}
        >
          <Home className="h-6 w-6" />
          <span>Pronajímatel</span>
        </button>
      </div>
    </div>
  );
}