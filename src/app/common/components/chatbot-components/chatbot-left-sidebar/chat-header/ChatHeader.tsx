import Image from 'next/image';
import React from 'react';

import SearchIcon from '../../../../../../../public/icons/searchIcon.svg';
import MessageIcon from '../../../../../../../public/icons/chatbot/messagesIcon.svg';
import { Button } from '@/app/common/ui/button/Button';
import StatusFitler from './status-filter/StatusFilter';
import { options } from './status-filter/StatusFilter.d';
import ChatFilter from './chat-filter/ChatFilter';
import { Filteroptions } from './chat-filter/ChatFilter.d';
import ScenarioFilter from './scenario-filter/ScenarioFilter';

interface ChatFilterProps {
  selectedStatus: string | any;
  onStatusChange: (status: string) => void;
}

const ChatHeader = ({ selectedStatus, onStatusChange }: ChatFilterProps) => {
  const handleSelect = (id: string | number) => {
    console.log('id selected', id);
  };
  onStatusChange;
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

      <div className="flex items-center gap-x-5">
        <div className="min-w-[44%]">
          <StatusFitler
            options={options}
            handleSelect={handleSelect}
            selectedStatus={selectedStatus}
            onStatusChange={onStatusChange}
          />
        </div>
        <ChatFilter options={Filteroptions} handleSelect={handleSelect} />
        <ScenarioFilter />
      </div>
    </div>
  );
};

export default ChatHeader;
