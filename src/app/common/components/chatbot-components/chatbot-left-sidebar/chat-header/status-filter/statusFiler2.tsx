import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import { getStatusInCookie, setStatusInCookie } from '@/cookies/cookies';
import { setFilteredStatus } from '@/redux/features/chat-bot-slice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StatusFitlerProps } from './StatusFilter.d';

interface SelectedChatProps {
  id: number;
  status: string;
  numberOfChats: string;
  color: string;
}

const SecondStatusFilter: React.FC<StatusFitlerProps> = ({
  handleSelect,
  options,
  selectedStatus,
  onStatusChange,
  conversation,
}) => {
  const [selected, setSelected] = useState<SelectedChatProps | any>(
    getStatusInCookie(options[0].status)
    // options[0].status
  );
  const [selectedColor, setSeletedColor] = useState('');
  const dispatch = useDispatch();

  const handleStatusChange = (status: string | any) => {
    setSelected(status);
    onStatusChange(status);
    dispatch(setFilteredStatus(status));
    // setSelected(getStatusInCookie(status));
    // onStatusChange(getStatusInCookie(status));
    setStatusInCookie(status);
  };

  const lastChatStatuses = conversation?.map((conversation) => {
    const lastMessage =
      conversation.chat_messages[conversation.chat_messages.length - 1];
    return lastMessage.chat_status;
  });

  // Step 1: Initialize statusCount with all statuses from the options array, setting counts to 0
  const statusCount = options.reduce((acc: any, option) => {
    if (option.status !== 'All') {
      acc[option.status] = 0;
    }
    return acc;
  }, {});

  // Step 2: Count the occurrences of each status in the statusArray
  lastChatStatuses?.forEach((status) => {
    if (statusCount.hasOwnProperty(status)) {
      statusCount[status]++;
    }
  });

  // Step 3: Update the options array with the status counts
  const updatedOptions = options.map((option) => {
    const count = statusCount[option.status] || 0;
    return {
      ...option,
      Status_number: count,
    };
  });

  console.log(statusCount, 'statusCount');
  console.log(options, 'this is conversation');
  console.log(lastChatStatuses, 'this is conversation');

  return (
    <div>
      <div className="flex">
        {updatedOptions?.map((option, key) => {
          return (
            <AnimateClick key={key}>
              <div
                className={`py-2 px-2 flex justify-between rounded-md items-center gap-x-2 ${selected == option.status ? 'bg-gray-900' : ''}`}
                onClick={() => {
                  handleSelect && handleSelect(option?.status),
                    setSelected(option.status),
                    setSeletedColor(option.color);
                  handleStatusChange(option.status);
                }}
              >
                {option?.status}

                <div
                  style={{ backgroundColor: `${option?.color}` }}
                  className="w-5 h-5 p-1 text-xs rounded-md flex justify-center items-center font bold"
                >
                  <span className="mt-0.5">
                    {option.status !== 'All' && option.Status_number}
                  </span>
                </div>
              </div>
            </AnimateClick>
          );
        })}
      </div>
    </div>
  );
};

export default SecondStatusFilter;
