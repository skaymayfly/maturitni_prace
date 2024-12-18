import React from 'react';
import { Mail } from 'lucide-react';
import { User } from '../../types';
import UserInterests from './UserInterests';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
      <p className="text-gray-600 mb-2">{user.university}</p>
      <p className="text-gray-700 mb-4">{user.bio}</p>
      {user.interests && <UserInterests interests={user.interests} />}
      <a
        href={`mailto:${user.email}`}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
      >
        <Mail className="h-4 w-4" />
        Kontaktovat
      </a>
    </div>
  );
}