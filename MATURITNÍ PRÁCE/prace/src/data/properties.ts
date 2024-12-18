import { Property } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Moderní byt pro studenty',
    description: 'Krásný světlý byt v blízkosti univerzity s výbornou dostupností do centra.',
    price: 12000,
    size: 45,
    location: 'Praha',
    type: 'apartment',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3'],
    landlordId: 'l1'
  },
  {
    id: '2',
    title: 'Studentský pokoj v Brně',
    description: 'Útulný pokoj ve sdíleném bytě, ideální pro studenty VUT.',
    price: 6000,
    size: 18,
    location: 'Brno',
    type: 'room',
    images: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3'],
    landlordId: 'l2'
  },
  {
    id: '3',
    title: 'Studentský pokoj v Praze',
    description: 'Útulný pokoj ve sdíleném bytě, ideální pro studenty ČVUT.',
    price: 7600,
    size: 20,
    location: 'Praha',
    type: 'room',
    images: ['https://plus.unsplash.com/premium_photo-1664301231899-5a7b1a621238?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    landlordId: 'l3'
  }
];