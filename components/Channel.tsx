// components/Channel.tsx
"use client";

import dynamic from "next/dynamic";

// Importation dynamique du composant Channel
const Channel = dynamic(
  () => import("@sendbird/uikit-react").then((mod) => mod.Channel),
  { ssr: false }
);

const ChannelComponent = () => {
  return (
    <div className="flex-1 h-full">
      <Channel />
    </div>
  );
};

export default ChannelComponent;

