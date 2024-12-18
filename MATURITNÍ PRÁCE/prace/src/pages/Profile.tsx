import React, { useState } from 'react';
import { User } from '../types';
import { Camera, Save } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState<Partial<User>>({
    name: 'Jan Novák',
    email: 'jan.novak@email.cz',
    university: 'ČVUT',
    interests: ['sport', 'cestování'],
    bio: 'Student informatiky hledající spolubydlící.'
  });

  const [newInterest, setNewInterest] = useState('');

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.trim() && profile.interests) {
      setProfile({
        ...profile,
        interests: [...profile.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    if (profile.interests) {
      setProfile({
        ...profile,
        interests: profile.interests.filter(interest => interest !== interestToRemove)
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                <Camera className="w-8 h-8" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg">
                <Camera className="w-4 h-4 text-blue-600" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-white/80">{profile.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jméno a příjmení
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Univerzita
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={profile.university}
              onChange={(e) => setProfile({ ...profile, university: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              O mně
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zájmy
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.interests?.map((interest) => (
                <span
                  key={interest}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {interest}
                  <button
                    onClick={() => handleRemoveInterest(interest)}
                    className="hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <form onSubmit={handleAddInterest} className="flex gap-2">
              <input
                type="text"
                placeholder="Přidat zájem..."
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Přidat
              </button>
            </form>
          </div>

          <div className="pt-4 border-t">
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Uložit změny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}