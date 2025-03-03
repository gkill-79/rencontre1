'use client';

import Image from "next/image";
import ChatWidget from '../components/ChatWidget';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Vérifie que next/navigation est bien utilisé ici
import { useSession } from 'next-auth/react';
import dynamic from "next/dynamic";

// ✅ Corrige le nom pour qu'il soit plus clair
const DynamicCarousel = dynamic(() => import('../components/Carousel'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/login'); // ✅ Redirection si non connecté
    }
  }, [session, router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="dark:invert" src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
            Go to nextjs.org →
          </a>
        </div>

        <ChatWidget /> {/* ✅ Assurez-vous que ce composant fonctionne bien */}
        <DynamicCarousel /> {/* ✅ Utilisation du composant dynamique */}
      </main>
      <Footer />
    </div>
  );
}


