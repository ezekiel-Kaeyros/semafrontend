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
import {
  ChatbotService,
  ChatConversationType,
  ChatMessageType,
} from '@/services';
import {
  getStatusInCookie,
  getUserCookies,
  setStatusInCookie,
} from '@/cookies/cookies';
import { input } from '@nextui-org/react';
import { useNumberConversationsData } from '@/zustand_store/numberConversation-store';

const ChatbotLeftSidebar = () => {
  const { setNb } = useNumberConversationsData();
  const dispatch = useDispatch();
  const [check, setChecked] = useState('');
  const [inputValue, setInputValue] = useState<string>('');

  const [selectedStatus, setSelectedStatus] = useState(
    getStatusInCookie('All')
  );

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

  // Fetching all chats
  const loadChatsByCompany = async () => {
    const hisEmail = getUserCookies().email;
    const response = await new ChatbotService().loadChatsByCompany({
      email: hisEmail,
    });
    if (response) {
      console.log('response.data', response);
      dispatch(setConversationChats(response.data.conversations));
      dispatch(setCompanyChats(response.data));
      setNb(response.data.conversations.length);
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

  // console.log(data, 'data');

  let newData: ChatConversationType[] | any =
    !(data instanceof Error) &&
    data &&
    data &&
    Array.isArray(data.conversations) &&
    data.conversations.length > 0 &&
    data.conversations;
  let newDataCloned;
  if (newData) {
    newDataCloned = newData?.slice();
  }
  // let newDataCloned = [...newData];

  // const colors = ['#182881', '#915103', '#B00020', '#157A3F'];
  // const labels = ['New', 'Pending', 'Expired', 'Solved'];

  const [filteredChats, setFilteredChats] =
    useState<ChatConversationType[]>(newDataCloned);

  // console.log(newDataCloned, 'newData');

  const filtered = newDataCloned?.filter(
    (chat: ChatConversationType) => chat.label === selectedStatus
  );

  const filteredSelected = selectedStatus === 'All' ? newDataCloned : filtered;

  // handleInput Change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTagrgeValue = event.target.value;
    setInputValue(inputTagrgeValue);

    const filteredNumbers = filteredSelected.filter(
      (item: ChatConversationType) => {
        return item.phone_number.includes(inputTagrgeValue);
      }
    );
    setFilteredChats(filteredNumbers);
  };

  const InputFiltered = !inputValue ? filteredSelected : filteredChats;

  console.log(InputFiltered, 'inputfiltered');

  const sortedChatsByDate =
    typeof data !== 'undefined' &&
    !(data instanceof Error) &&
    data?.conversations
      ? sortDataByDate(data.conversations)
      : [];

  return (
    <div className="transition-all duration-300 ease-in-out delay-150 border-slate-600 w-[100%] dark:bg-mainDark border-r-[0.02px] h-[100%]">
      <div className="flex flex-col gap-[1.5rem] p-[1rem] w-full">
        <div className="flex flex-row justify-between p-[.5rem]">
          <ChatHeader
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
            onInputChange={handleInputChange}
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
          {InputFiltered?.map((item: ChatConversationType, key: any) => {
            console.log(
              formatDate(item?.chat_messages.slice(-1)[0]?.date?.toString()),
              'date'
            );
            return (
              <ChatItem
                id={item.phone_number}
                handleSelected={() => handleSelected(item)}
                key={key}
                number={item?.phone_number}
                status={[...item.chat_messages].reverse()[0].chat_status}
                color={item.color}
                unread_msg={item.unread_msg}
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

// sorted array according to date.
// .sort(
//             (a: ChatConversationType, b: ChatConversationType) => {
//               const lastMessageDateA: any = new Date(
//                 a.chat_messages[a.chat_messages.length - 1].date!
//               );
//               const lastMessageDateB: any = new Date(
//                 b.chat_messages[b.chat_messages.length - 1].date!
//               );
//               return lastMessageDateB - lastMessageDateA;
//             }
//           )
