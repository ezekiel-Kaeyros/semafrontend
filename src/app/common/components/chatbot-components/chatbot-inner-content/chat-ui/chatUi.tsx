'use client';
import React from 'react';
import ChatbotBottomSection from './chatbot-bottom-section/chatbotBottomSection';
import ChatbotTopSection from './chatbot-top-section/chatbotTopSection';
import ChatbotMainSection from './chatbot-main-section/ChatbotMainSection';
import { useChatBot } from '@/app/hooks/useChatBot';

const ChatUI = ({ id }: { id: string | number }) => {
  const { chatsConversation } = useChatBot();

  console.log('chats', chatsConversation);

  const selectedChat = chatsConversation?.find(
    (chat) => chat.phone_number.toString() === id.toString()
  );

  return (
    <div className=" flex flex-col">
      <ChatbotTopSection selectedChat={selectedChat} />
      <div className="no-scrollbar ">
        <ChatbotMainSection selectedChat={selectedChat} />
      </div>
      <div className="fixed  max-w-4xl rounded-full bottom-4 left-[42%] right-8">
        <ChatbotBottomSection
          number={selectedChat?.phone_number}
          numberId={id.toString()}
        />
      </div>
    </div>
  );
};

export default ChatUI;
