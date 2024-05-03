'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EmptyChatboxMessageImg from '../../../../../../public/icons/chatbot/emptyMessage.svg';

import {
  setChats,
  setCompanyChats,
  setConversationChats,
  toggleDisplayChatUI,
} from '@/redux/features/chat-bot-slice';

import ChatHeader from './chat-header/ChatHeader';
import ChatItem from './chat-item/ChatItem';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDate, sortDataByDate } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BACKEND_CHATBOT_API_URL } from '@/utils/backendUrls';
import Skeleton from './Skeleton';
import { allConersationType, conversationType } from '@/utils/types';
import { ChatsByCompanyReturnType } from '@/redux/features/types';
import Image from 'next/image';
import { ChatbotService, ChatConversationType } from '@/services';
import {
  getStatusInCookie,
  getUserCookies,
  setStatusInCookie,
} from '@/cookies/cookies';

const ChatbotLeftSidebar = () => {
  const dispatch = useDispatch();
  const [check, setChecked] = useState('');

  const [selectedStatus, setSelectedStatus] = useState(
    getStatusInCookie('All')
  );
  const [filteredChats, setFilteredChats] = useState([]);

  // Function to update selectedStatus when dropdown value changes
  const handleStatusChange = (status: any) => {
    // setSelectedStatus();
    setStatusInCookie(status);
    setSelectedStatus(getStatusInCookie(status));
    //  getStatusInCookie(options[0].status);
  };

  const handleSelected = (item: any) => {
    if (check != item.phone_number) {
      setChecked(item.phone_number);
      dispatch(toggleDisplayChatUI(true));
      dispatch(setChats(item));
    } else {
      setChecked('');
      dispatch(toggleDisplayChatUI(false));
      dispatch(setChats([]));
    }
  };

  let token = '100609346426084';
  console.log(BACKEND_CHATBOT_API_URL + token);

  // Fetching all chats
  const loadChatsByCompany = async () => {
    const hisEmail = getUserCookies().email;
    const response = await new ChatbotService().loadChatsByCompany({
      email: hisEmail,
    });
    if (response) {
      console.log('response.data', response.data);

      dispatch(setCompanyChats(response.data.data));
      dispatch(setConversationChats(response.data.data.conversations));
      return response.data;
    } else {
      return new Error('Failed to fetch data');
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['chatsByCompany', token],
    queryFn: () => loadChatsByCompany(),
    refetchInterval: 5000,
  });

  let newData: ChatConversationType[] | any =
    !(data instanceof Error) &&
    data &&
    data.data &&
    Array.isArray(data.data.conversations) &&
    data.data.conversations.length > 0 &&
    data.data.conversations;

  let newDataCloned = newData?.slice();
  // let newDataCloned = [...newData];

  const colors = ['#182881', '#915103', '#B00020', '#157A3F'];
  const labels = ['New', 'Pending', 'Expired', 'Solved'];

  let currentIndex = 0;

  // Function to get a random color and label
  function getRandomColorAndLabel() {
    const color = colors[currentIndex];
    const label = labels[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length; // Move to the next index, looping back to 0 when reaching the end
    return { color, label };
  }

  const result = newDataCloned?.map((obj: ChatConversationType) => {
    const { color, label } = getRandomColorAndLabel();
    const newObj = {
      ...obj,
      color: color,
      label: label,
    };
    return newObj;
  });

  // useEffect(() => {
  // const filtered = result?.filter(
  //   (chat: ChatConversationType) => chat.label === selectedStatus
  // );
  // const selectedFilter = selectedStatus === 'All' ? result : filtered;
  // // setFilteredChats(selectedFilter);
  // setFilteredChats(selectedFilter);
  // }, [filteredChats, selectedStatus]);

  const filtered = result?.filter(
    (chat: ChatConversationType) => chat.label === selectedStatus
  );
  const selectedFilter = selectedStatus === 'All' ? result : filtered;
  // setFilteredChats(selectedFilter);

  console.log(selectedStatus, 'selectedStatus');

  const sortedChatsByDate =
    typeof data !== 'undefined' &&
    !(data instanceof Error) &&
    data.data?.conversations
      ? sortDataByDate(data.data.conversations)
      : [];

  return (
    <div className="transition-all duration-300 ease-in-out delay-150 border-slate-600 w-[100%] dark:bg-mainDark border-r-[0.02px] h-[100%]">
      <div className="flex flex-col gap-[1.5rem] p-[1rem] w-full">
        <div className="flex flex-row justify-between p-[.5rem]">
          <ChatHeader
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      <div className="flex flex-col bg-bgBlackForBtn gap-[1.5rem]  w-full ">
        <div className="overflow-y-scroll no-scrollbar h-[67vh] space-y-2">
          {!data && (
            <div>
              <div className="flex flex-col items-center h-[67vh] justify-center">
                <Image src={EmptyChatboxMessageImg} alt="empty chatbot"></Image>
                <p className="">No Active message</p>
              </div>
            </div>
          )}

          {data && isLoading && (
            <div className="mx-6">
              <Skeleton />
            </div>
          )}
          {// !(data instanceof Error) &&
          // data &&
          // data.data &&
          // Array.isArray(data.data.conversations) &&
          // data.data.conversations.length > 0 &&
          selectedFilter?.map((item: ChatConversationType, key: any) => {
            return (
              <ChatItem
                id={item.phone_number}
                handleSelected={() => handleSelected(item)}
                key={key}
                number={item?.phone_number}
                status={item.label}
                color={item.color}
                // message={item?.chat_messages
                //   .slice(-1)[0]
                //   ?.text?.substring(0, 10)}
                date={formatDate(
                  item?.chat_messages.slice(-1)[0]?.date?.toString()
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatbotLeftSidebar;
