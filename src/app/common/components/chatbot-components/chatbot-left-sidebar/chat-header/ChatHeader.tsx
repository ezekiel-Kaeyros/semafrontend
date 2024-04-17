import Image from 'next/image';
import React from 'react';

import SearchIcon from '../../../../../../../public/icons/searchIcon.svg';
import MessageIcon from '../../../../../../../public/icons/chatbot/messagesIcon.svg';
import { Button } from '@/app/common/ui/button/Button';
import StatusFitler from './status-filter/StatusFilter';
import { options } from './status-filter/StatusFilter.d';

const ChatHeader = () => {
  const handleSelect = (id: string | number) => {
    console.log('id selected', id);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Inbox</h1>
        <Image src={SearchIcon} alt="Search icon" />
      </div>
      {/* Launch bulk message button */}
      <div className="my-6">
        <Button rightIcon={MessageIcon}>Launch Bulk Message</Button>
      </div>
      {/* Status filtering component */}

      <StatusFitler options={options} handleSelect={handleSelect} />
    </div>
  );
};

export default ChatHeader;
