'use client';

import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const HeaderClient: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = status === 'authenticated';

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <header>
      <nav>
        {isAuthenticated ? (
          <>
            <span>Welcome, {session?.user?.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </nav>
    </header>
  );
};

export default HeaderClient;