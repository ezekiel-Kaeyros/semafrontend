'use client';
import React from 'react';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import Image from 'next/image';
import notificationsIcon from '../../../../../../public/right_side_bar/notifications.png';
import playvideoIcon from '../../../../../../public/left_side_bar_icons/playvideo.png';
import infoIcon from '../../../../../../public/right_side_bar/info.png';
import EyeIcon from '../../../../../../public/icons/chatbot/eyeIcon.svg';

import { Button } from '@/app/common/ui/button/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ChatbotHeader = () => {
  const sideBarToggle = useSelector(
    (state: RootState) => state.ChatBotSlice.sideBarToggle
  );
  const pathname = usePathname();

  return (
    <div
      className={`${
        sideBarToggle ? 'sm:w-full' : 'sm:w-full'
      } flex  flex-row items-center justify-between px-6 py-[.5rem] border-slate-600 dark:bg-mainDark border-b-[0.02px] h-[80px] sm:text-base text-xs`}
    >
      <div className="">
        <Button rightIcon={playvideoIcon} className="sm:text-base text-xs">
          Watch-tutorial
        </Button>
      </div>

      {/* Right sections */}

      <div className="flex items-center  gap-x-12">
        {/* Buttons */}
        <div className="flex gap-x-4">
          {!pathname?.includes('scenarios') && (
            <div>
              <Button
                href="/dashboard/chatbot/scenarios"
                icon={EyeIcon}
                className="rounded-full text-sm"
              >
                View scenario
              </Button>
            </div>
          )}
          <div>
            <AnimateClick>
              <Link
                href="/dashboard/chatbot"
                className="flex flex-row gap-[.5rem] items-center justify-center bg-mainDarkLight dark:bg-bgBlackForBtn cursor-pointer rounded-lg  h-[40px] py-1 px-3"
              >
                <span>Conversations</span>
                <span className="rounded-full text-[12px] w-[20px] h-[20px] flex justify-center dark:bg-slate-500">
                  1
                </span>
              </Link>
            </AnimateClick>
          </div>
        </div>

        {/* Notification */}
        <div className="flex flex-row gap-[1rem]">
          <AnimateClick>
            <div className="bg-mainDarkLight dark:bg-bgBlackForBtn cursor-pointer rounded-full w-12 h-12 p-1 flex items-center justify-center">
              <Image
                src={notificationsIcon}
                width={30}
                alt="Notification icon"
              />
            </div>
          </AnimateClick>

          <AnimateClick>
            <div className="bg-mainDarkLight dark:bg-bgBlackForBtn cursor-pointer rounded-full w-12 h-12 p-1 flex items-center justify-center">
              <Image src={infoIcon} width={30} alt="Notification icon" />
            </div>
          </AnimateClick>
        </div>
      </div>
    </div>
  );
};
export default ChatbotHeader;
