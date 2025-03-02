import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';

interface ProfileProps {
  userData: {
    id: string;
    username?: string | null;
    email: string;
    bio?: string | null;
    dateOfBirth?: Date | null;
    location?: string | null;
    profileImage?: string | null;
    createdAt: Date;
  };
}

export default function Profile({ userData }: ProfileProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    bio: userData?.bio || '',
    location: userData?.location || '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Protect this page - only accessible for logged in users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio: userInfo.bio,
          location: userInfo.location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour du profil');
      }

      setMessage({ text: 'Profil mis à jour avec succès', type: 'success' });
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        setMessage({ text: error.message, type: 'error' });
      } else {
        setMessage({ text: 'Une erreur est survenue', type: 'error' });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  if (status === 'loading' || !userData) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Mon Profil - Rencontre1</title>
        <meta name="description" content="Gérez votre profil sur Rencontre1" />
      </Head>

      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Profile header */}
            <div className="bg-primary bg-opacity-10 px-4 py-5 border-b border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium text-gray-900">Mon Profil</h1>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {isEditing ? 'Annuler' : 'Modifier'}
                </button>
              </div>
            </div>

            {/* Profile content */}
            <div className="px-4 py-5 sm:p-6">
              {message.text && (
                <div
                  className={\`p-4 mb-6 rounded-md \${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}\`}
                >
                  {message.text}
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={userInfo.bio}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Parlez un peu de vous..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Localisation
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={userInfo.location}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Ville, Pays"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70"
                    >
                      {isUpdating ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {userData.profileImage ? (
                          <img
                            src={userData.profileImage}
                            alt={userData.username || 'Profile'}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <svg className="h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Nom d'utilisateur</dt>
                        <dd className="text-sm text-gray-900">{userData.username || 'Non défini'}</dd>
                      </div>
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="text-sm text-gray-900">{userData.email}</dd>
                      </div>
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Localisation</dt>
                        <dd className="text-sm text-gray-900">{userData.location || 'Non définie'}</dd>
                      </div>
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Date de naissance</dt>
                        <dd className="text-sm text-gray-900">
                          {userData.dateOfBirth
                            ? new Date(userData.dateOfBirth).toLocaleDateString()
                            : 'Non définie'}
                        </dd>
                      </div>
                      <div className="py-3">
                        <dt className="text-sm font-medium text-gray-500">Bio</dt>
                        <dd className="mt-1 text-sm text-gray-900">{userData.bio || 'Aucune bio définie'}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  
  if (!session || !session.user?.id) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  // Fetch user data from database
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id as string,
    },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
      dateOfBirth: true,
      location: true,
      profileImage: true,
      createdAt: true,
    },
  });

  if (!user) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userData: JSON.parse(JSON.stringify(user)), // Serialization due to Date objects
    },
  };
};
