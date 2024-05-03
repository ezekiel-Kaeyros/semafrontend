'use client';
import Sidebar from '@/app/modules/sidebar/Sidebar';
import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const LayoutComponents = ({
  children, // params: { lang },
}: {
  children: React.ReactNode;
  // params: { lang: string };
}) => {
  const sideBarToggle = useSelector(
    (state: RootState) => state.ChatBotSlice.sideBarToggle
  );
  return (
    <div className="flex">
      <div className={`${sideBarToggle ? 'w-fit' : 'w-[14%]'} fixed`}>
        <Sidebar />
      </div>
      <div
        className={`${sideBarToggle ? 'w-[95.8%]' : ' w-[86%]'} h-screen  ml-auto overflow-y-scroll scrollbar-hide `}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutComponents;
