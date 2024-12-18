import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Jana Nováková',
    email: 'jana.novakova@email.cz',
    role: 'student',
    university: 'Univerzita Karlova',
    interests: ['cestování', 'fotografování', 'sport'],
    bio: 'Studuji medicínu a hledám spolubydlící se stejnými zájmy.'
  },
  {
    id: '2',
    name: 'Petr Svoboda',
    email: 'petr.svoboda@email.cz',
    role: 'student',
    university: 'VUT Brno',
    interests: ['programování', 'hudba', 'gaming'],
    bio: 'IT student hledající někoho na společné bydlení v Brně.'
  },
  {
    id: '3',
    name: 'Matěj Klíma',
    email: 'matej.klima@email.cz',
    role: 'student',
    university: 'ČVUT',
    interests: ['programování', 'hudba', 'gaming'],
    bio: 'IT student hledající někoho na společné bydlení v Praze.'
  }
];