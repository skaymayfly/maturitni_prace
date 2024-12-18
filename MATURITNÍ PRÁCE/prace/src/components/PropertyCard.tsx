import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-gray-600">{property.location}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-blue-600 font-bold">{property.price} Kč/měsíc</span>
          <span className="text-gray-500">{property.size} m²</span>
        </div>
        <p className="mt-2 text-gray-700 line-clamp-2">{property.description}</p>
        <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition-opacity">
          Zobrazit detail
        </button>
      </div>
    </div>
  );
}