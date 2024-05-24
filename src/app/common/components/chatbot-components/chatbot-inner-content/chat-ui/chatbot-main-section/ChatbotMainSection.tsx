'use client';
import React, { useEffect, useRef } from 'react';
import ChatBubble from './chatBubble.tsx/ChatBubble';
import { ChatbotMainSectionProps } from './ChatbotMainSection.d';
import { formatDate } from '@/utils/utils';
import { useGlobalContext } from '@/app/common/contex-provider';
import { ChatConversationType, ChatMessageType } from '@/services';
import { useDispatch } from 'react-redux';
import { setChats } from '@/redux/features/chat-bot-slice';
import { useChatBot } from '@/app/hooks/useChatBot';

const ChatbotMainSection: React.FC<ChatbotMainSectionProps> = ({
  selectedChat,
}) => {
  const chatContainerRef = useRef<any>(null);
  const { selectedScenarioLabel } = useGlobalContext();
  const dispatch = useDispatch();
  const { filterStatus } = useChatBot();

  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    dispatch(setChats(selectedChat));
  }, [selectedChat]);

  const filtered = selectedChat?.chat_messages.filter(
    (item: ChatMessageType) => item.scenario_name === selectedScenarioLabel
  );

  const mappedConversations =
    filtered?.length !== 0 ? filtered : selectedChat.chat_messages;

  const filterdStatusConversation = mappedConversations?.filter(
    (chats: ChatMessageType) => chats.chat_status === filterStatus
  );

  const mappedFilteredConversation =
    filterStatus === 'All' || filterStatus == ''
      ? mappedConversations
      : filterdStatusConversation;

  console.log(filterStatus, 'mappedFilteredConversation');

  return (
    <div
      className="flex-grow p-4 bg-dark 
     "
    >
      <div
        ref={chatContainerRef}
        className=" no-scrollbar  flex h-[80vh] scroll-smooth transition ease-linear duration-200 overflow-y-auto flex-col space-y-2 px-4 pt-4 pb-32"
      >
        {selectedChat &&
          mappedFilteredConversation.map((chat: any, key: any) => (
            <ChatBubble
              date={formatDate(chat?.date?.toString())}
              isBot={chat?.is_bot}
              isAdmin={chat?.is_admin}
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
