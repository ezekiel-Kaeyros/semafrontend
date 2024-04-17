import ChatbotLeftSidebar from '@/app/common/components/chatbot-components/chatbot-left-sidebar/chatbotLeftSidebar';

import React from 'react';

const LayoutChatComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen  flex-row w-full dark:bg-mainDark">
      <div className="w-[35%]">
        <ChatbotLeftSidebar />
      </div>
      <div className={`md:block   w-full h-fit overflow-y-auto`}>
        {children}
      </div>
      {/* <div className={` transition-all duration-300 ease-in-out delay-150`}>
        <ChatbotRightSidebar />
      </div> */}
    </div>
  );
};

export default LayoutChatComponent;
