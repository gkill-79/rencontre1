// components/ChatWidget.tsx
"use client";

import dynamic from "next/dynamic";
import ChannelListComponent from "./ChannelList";
import ChannelComponent from "./Channel";

// Importation dynamique de SendBirdProvider
const SendBirdProvider = dynamic(
  () => import("@sendbird/uikit-react").then((mod) => mod.SendBirdProvider),
  { ssr: false }
);

// Vérifie que les variables d'environnement sont bien définies
const APP_ID = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID!;
const USER_ID = process.env.NEXT_PUBLIC_SENDBIRD_USER_ID!;

const ChatWidget = () => {
  if (!APP_ID || !USER_ID) {
    console.error("❌ Sendbird APP_ID ou USER_ID est manquant !");
    return <p>Erreur de configuration Sendbird.</p>;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "350px",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SendBirdProvider appId={APP_ID} userId={USER_ID}>
        <ChannelListComponent />
        <ChannelComponent />
      </SendBirdProvider>
    </div>
  );
};

export default ChatWidget;



