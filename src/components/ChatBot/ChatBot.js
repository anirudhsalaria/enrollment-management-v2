import React, { useEffect } from 'react';

const BotpressChat = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: 'mysterious-oryx',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '<clientID>',
      })
    }
  }, [])

  return (
    <div>
      <div id="webchat" />
    </div>
  );
};

export default BotpressChat;
