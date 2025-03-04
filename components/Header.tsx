import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = status === 'authenticated' && session;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-2xl text-primary">
                Rencontre1
              </Link>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/' ? 'text-primary bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                Accueil
              </Link>
              <Link href="/search" className={`px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/search' ? 'text-primary bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                Recherche
              </Link>
              <Link href="/messages" className={`px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/messages' ? 'text-primary bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                Messages
              </Link>
            </div>

            <div className="ml-4 relative">
              {isAuthenticated ? (
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {session?.user?.name?.[0] || "U"}
                    </div>
                  </button>
                  
                  {/* Dropdown menu */}
                  {isMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Mon profil
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Paramètres
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link href="/auth/signin" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50">
                    Connexion
                  </Link>
                  <Link href="/auth/signup" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">{isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
              {/* Hamburger icon */}
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* X icon */}
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium ${router.pathname === '/' ? 'text-primary bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
              Accueil
            </Link>
            <Link href="/search" className={`block px-3 py-2 rounded-md text-base font-medium ${router.pathname === '/search' ? 'text-primary bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
              Recherche
            </Link>
            <Link href="/messages" className={`block px-3 py-2 rounded-md text-base font-medium ${router.pathname === '/messages' ? 'text-primary bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
              Messages
            </Link>
          </div>
          
          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {session?.user?.name?.[0] || "U"}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{session?.user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{session?.user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link href="/profile" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                  Mon profil
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                  Paramètres
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-2 px-4">
                <Link href="/auth/signin" className="w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 border-primary">
                  Connexion
                </Link>
                <Link href="/auth/signup" className="w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                  Inscription
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;