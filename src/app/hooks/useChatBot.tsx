'use client';
import {
  ConversationsType,
  ChatsByCompanyReturnType,
  ChatConversationType,
} from '@/redux/features/types';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ChatbotTopSectionProps } from '../common/components/chatbot-components/chatbot-inner-content/chat-ui/chatbot-top-section/ChatbotTopSection';
export const useChatBot = () => {
  const conversations: ConversationsType[] = useSelector(
    (state: RootState) => state.ChatBotSlice.conversations
  );

  const selectedConversation: number = useSelector(
    (state: RootState) => state.ChatBotSlice.selectedConversation
  );

  const selectedConversationObj: ConversationsType = useSelector(
    (state: RootState) => state.ChatBotSlice.selectedConversationObj
  );

  const clearTimerInterval = useSelector(
    (state: RootState) => state.ChatBotSlice.clearTimerInterval
  );

  const firstTime = useSelector(
    (state: RootState) => state.ChatBotSlice.firstTime
  );

  const displayClientInfoInChatToggle: boolean = useSelector(
    (state: RootState) => state.ChatBotSlice.displayClientInfoInChatToggle
  );
  const message: ChatConversationType = useSelector(
    (state: RootState) => state.ChatBotSlice.message
  );
  const chatsCompany: ChatsByCompanyReturnType = useSelector(
    (state: RootState) => state.ChatBotSlice.companychats
  );
  const chatsConversation: ChatConversationType[] = useSelector(
    (state: RootState) => state.ChatBotSlice.chatsConversation
  );
  const dispatch = useDispatch<AppDispatch>();

  return {
    firstTime,
    conversations,
    clearTimerInterval,
    selectedConversation,
    selectedConversationObj,
    displayClientInfoInChatToggle,
    dispatch,
    chatsCompany,
    chatsConversation,
    message,
  };
};
