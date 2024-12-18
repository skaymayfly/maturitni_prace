import React from 'react';

interface UserInterestsProps {
  interests: string[];
}

export default function UserInterests({ interests }: UserInterestsProps) {
  return (
    <div className="mb-4">
      <h4 className="font-medium mb-2">Zájmy:</h4>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}