'use client';
import React, { useEffect, useRef } from 'react';
import ChatBubble from './chatBubble.tsx/ChatBubble';
import { ChatbotMainSectionProps } from './ChatbotMainSection.d';
import { formatDate } from '@/utils/utils';

const ChatbotMainSection: React.FC<ChatbotMainSectionProps> = ({
  selectedChat,
}) => {
  const chatContainerRef = useRef<any>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);
  return (
    <div
      className="flex-grow p-4 bg-dark 
     "
    >
      <div
        ref={chatContainerRef}
        className="flex h-[80vh] scroll-smooth transition ease-linear duration-200 overflow-y-auto flex-col space-y-2 px-4 pt-4 pb-32"
      >
        {selectedChat &&
          selectedChat?.chat_messages.map((chat: any, key: any) => (
            <ChatBubble
              date={formatDate(chat?.date?.toString())}
              isBot={chat?.is_bot}
              message={chat?.text}
              name={selectedChat?.phone_number}
              key={key}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatbotMainSection;
