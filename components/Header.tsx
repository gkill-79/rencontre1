import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="ml-2 text-xl font-bold text-primary">Rencontre1</span>
        </Link>

        <nav className="flex items-center space-x-4">
          {session ? (
            <>
              <Link href="/profile" className="text-gray-600 hover:text-primary">
                Mon Profil
              </Link>
              <Link href="/messages" className="text-gray-600 hover:text-primary">
                Messages
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
              >
                Connexion
              </button>
              <Link href="/auth/signup" className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition">
                Inscription
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;