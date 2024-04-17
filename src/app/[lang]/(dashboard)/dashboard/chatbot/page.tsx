import ChatBot from '@/app/modules/chatbot/chatBot';
import React from 'react';
import LayoutChatComponent from './LayoutChatComponent';

const ChatBotPage = async () => {
  return (
    <LayoutChatComponent>
      <ChatBot />
    </LayoutChatComponent>
  );
};

export default ChatBotPage;
