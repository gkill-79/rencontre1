import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Rencontre1 - Trouvez l'amour</title>
        <meta name="description" content="Site de rencontres pour célibataires" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trouvez l'amour à portée de clic
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Des milliers de célibataires vous attendent. Inscrivez-vous dès maintenant et commencez votre aventure amoureuse.
            </p>
            
            {!session && (
              <Link href="/auth/signup" className="px-8 py-3 bg-white text-primary text-lg rounded-full font-semibold hover:bg-opacity-90 transition">
                S'inscrire gratuitement
              </Link>
            )}
            
            {session && (
              <Link href="/discover" className="px-8 py-3 bg-white text-primary text-lg rounded-full font-semibold hover:bg-opacity-90 transition">
                Découvrir des profils
              </Link>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg shadow-md">
                <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Créez votre profil</h3>
                <p className="text-gray-600">Ajoutez vos photos et partagez vos centres d'intérêt pour vous présenter aux autres.</p>
              </div>
              
              <div className="text-center p-6 rounded-lg shadow-md">
                <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Découvrez des profils</h3>
                <p className="text-gray-600">Explorez les profils des célibataires près de chez vous selon vos préférences.</p>
              </div>
              
              <div className="text-center p-6 rounded-lg shadow-md">
                <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Commencez à discuter</h3>
                <p className="text-gray-600">Une fois le match établi, engagez la conversation et faites connaissance.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
