'use client';
import React from 'react';
import Image from 'next/image';

import { ChatItemProps } from './ChatItem.d';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const ChatItem: React.FC<ChatItemProps> = ({
  id,
  picture,
  date,
  message,
  number,
  status,
  color,
  unread_msg,
}) => {
  const pathname = usePathname();
  const { conversationStatus } = useSelector(
    (state: RootState) => state.setConversationStatus
  );
  const currentId = pathname.split('/').pop();

  console.log(currentId, 'conversationStatus');
  console.log(id, 'conversationStatusid');

  let backgroundCol = '';
  switch (status) {
    case 'open':
      backgroundCol = '#182881';
      break;
    case 'pending':
      backgroundCol = '#915103';
      break;
    case 'expired':
      backgroundCol = '#B00020';
      break;
    case 'solved':
      backgroundCol = '#157A3F';
      break;

    default:
      backgroundCol = '#182881';
      break;
  }

  const calculatedBackgroundCol = () => {
    if (currentId === id) {
      if (status === 'pending' || conversationStatus === 'pending') {
        return '#915103';
      } else if (status === 'open' || conversationStatus === 'open') {
        return '#182881';
      }
    }
    return backgroundCol;
  };

  return (
    <AnimateClick>
      <Link href={`/dashboard/chatbot/${id}`}>
        <div
          className={`w-full py-4 px-8 ${pathname === `/en/dashboard/chatbot/${id}` && ' bg-mainDarkLight border-r-4 border-primary'} flex justify-between items-center hover:dark:bg-mainDarkLight ${pathname === `/fr/dashboard/chatbot/${id}` && ' bg-mainDarkLight border-r-4 border-primary'}`}
        >
          <div className="flex relative gap-x-4">
            {picture ? (
              <Image src={picture} alt="Profile picture" />
            ) : (
              <div className=" relative w-12 h-12 rounded-full flex justify-center items-center bg-[#A9B3EF] font-bold text-primary">
                I
                <div className="absolute -bottom-1 right-0">
                  <h2 className="bg-[#157A3F] w-4 h-4 rounded-[50%] flex items-center justify-center">
                    <p className="text-sm text-center grid place-items-center h-5">
                      {/* {unread_msg} */}
                    </p>
                  </h2>
                </div>
              </div>
            )}
            <div>
              <h1 className="font-bold">{number}</h1>
              <p className="mt-1 text-sm  opacity-9<0">
                {message || ' message'}
              </p>
            </div>
          </div>

          {/* Date and status */}
          <div className="flex flex-col items-end">
            <h1 className="text-xs opacity-60">{date || 'Dec 10 09:04'}</h1>
            <div
              className={`mt-2 text-xs font-bold py-1 px-3 rounded-full`}
              // style={{ background: `${backgroundCol}` }}
              style={{ background: `${calculatedBackgroundCol()}` }}
            >
              {/* {(status && status) || 'open'} */}
              {currentId !== id || conversationStatus == 'None'
                ? (status && status) || 'open'
                : conversationStatus !== 'None' && conversationStatus}
              {/* {conversationStatus === 'None' && currentId === id
                ? (status && status) || 'open'
                : conversationStatus} */}
            </div>
          </div>
        </div>
      </Link>
    </AnimateClick>
  );
};

export default ChatItem;
