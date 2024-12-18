import { Menu, X, Home, Users, UserCircle, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NavLink from './navigation/NavLink';
import MobileNavLink from './navigation/MobileNavLink';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const commonNavigation = [
    { name: 'Bydlení', href: '/', icon: Home },
    { name: 'O nás', href: '/about', icon: Users },
    { name: 'Seznam se', href: '/connect', icon: Users },
  ];

  const authNavigation = isAuthenticated
    ? [
        { name: 'Profil', href: '/profile', icon: UserCircle },
        { name: 'Odhlásit', href: '/', icon: LogOut, onClick: logout },
      ]
    : [{ name: 'Přihlášení', href: '/login', icon: LogIn }];

  const navigation = [...commonNavigation, ...authNavigation];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-white text-xl font-extrabold font-poppins">
                fair estate.
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  href={item.href}
                  icon={item.icon}
                  name={item.name}
                  onClick={item.onClick}
                />
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <MobileNavLink
                key={item.name}
                href={item.href}
                icon={item.icon}
                name={item.name}
                onClick={() => {
                  setIsOpen(false);
                  item.onClick?.();
                }}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
