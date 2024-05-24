'use client';
import React from 'react';
import ChatbotBottomSection from './chatbot-bottom-section/chatbotBottomSection';
import ChatbotTopSection from './chatbot-top-section/chatbotTopSection';
import ChatbotMainSection from './chatbot-main-section/ChatbotMainSection';
import { useChatBot } from '@/app/hooks/useChatBot';

const ChatUI = ({ id }: { id: string | number }) => {
  const { chatsConversation } = useChatBot();

  // ;

  const selectedChat = chatsConversation?.find(
    (chat) => chat.phone_number.toString() === id.toString()
  );
  return (
    <div className=" flex flex-col relative w-full ">
      <ChatbotTopSection selectedChat={selectedChat} />
      <div className="no-scrollbar  w-full">
        <ChatbotMainSection selectedChat={selectedChat} />
      </div>
      <div className=" w-full rounded-full bottom-4 absolute flex justify-center px-20 ">
        <ChatbotBottomSection
          number={selectedChat?.phone_number}
          numberId={id.toString()}
        />
      </div>
    </div>
  );
};

export default ChatUI;
