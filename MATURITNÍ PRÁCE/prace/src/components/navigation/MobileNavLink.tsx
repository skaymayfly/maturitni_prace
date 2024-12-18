import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface MobileNavLinkProps {
  href: string;
  icon: LucideIcon;
  name: string;
  onClick?: () => void;
}

export default function MobileNavLink({ href, icon: Icon, name, onClick }: MobileNavLinkProps) {
  return (
    <Link
      to={href}
      className="text-white hover:bg-blue-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <Icon className="h-4 w-4" />
        <span>{name}</span>
      </div>
    </Link>
  );
}