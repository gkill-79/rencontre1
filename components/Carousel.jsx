// components/ChatWidget.jsx
import dynamic from 'next/dynamic';
import '@sendbird/uikit-react/dist/index.css';

const SendBirdProvider = dynamic(
  () => import('@sendbird/uikit-react').then(mod => mod.SendBirdProvider),
  { ssr: false }
);
const ChannelList = dynamic(
  () => import('@sendbird/uikit-react').then(mod => mod.ChannelList),
  { ssr: false }
);
const Channel = dynamic(
  () => import('@sendbird/uikit-react').then(mod => mod.Channel),
  { ssr: false }
);

const ChatWidget = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      width: '300px',
      height: '400px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
    }}>
      <SendBirdProvider appId="VOTRE_APP_ID" userId="USER_ID">
        <ChannelList />
        <Channel />
      </SendBirdProvider>
    </div>
  );
};

export default ChatWidget;
