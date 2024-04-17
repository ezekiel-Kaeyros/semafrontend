'use client';
import Image from 'next/image';
import React from 'react';

import emptyIcon from '../../../../../../../public/message_container_icons/empty.png';

const EmptyChatUI = () => {
  return (
    <div className="w-[100%] py-64 bg-mainDark h-full grid justify-items-center gap-[1.5rem] content-center">
      <div className="p-1 flex items-center justify-center">
        <Image src={emptyIcon} width={150} alt="Notification icon" />
      </div>
      <div className="flex flex-col justify-center justify-items-center w-[200px]">
        <h1
          className=""
          style={{
            fontSize: 'bold',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Welcome to Chatbot
        </h1>
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
          }}
        >
          Get Started by selecting a client to display a message
        </p>
      </div>
      <div className="flex flex-col justify-center gap-[1rem] justify-items-center w-[200px]"></div>
    </div>
  );
};

export default EmptyChatUI;
