// components/ChannelList.tsx
"use client";

import dynamic from "next/dynamic";

// Importation dynamique de Sendbird UIKit
const ChannelList = dynamic(
  () => import("@sendbird/uikit-react").then((mod) => mod.ChannelList),
  { ssr: false }
);

// Vérifie que les variables d'environnement sont bien définies
const APP_ID = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID!;
const USER_ID = process.env.NEXT_PUBLIC_SENDBIRD_USER_ID!;

const ChannelListComponent = () => {
  if (!APP_ID || !USER_ID) {
    console.error("❌ Sendbird APP_ID ou USER_ID est manquant !");
    return <p>Erreur de configuration Sendbird.</p>;
  }

  return (
    <div className="h-full w-80 border-r border-gray-300">
      <ChannelList
        onChannelSelect={(channel) => {
          console.log("Canal sélectionné :", channel);
        }}
      />
    </div>
  );
};

export default ChannelListComponent;

