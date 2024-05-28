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

  console.log(selected, 'this is selected');

  return (
    <div>
      <div className="flex">
        {options?.map((option, key) => {
          console.log(option.status == selected, 'selected');
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
                  className="w-3 h-3 p-1 text-xs rounded-full flex justify-center items-center font bold"
                >
                  {/* {option?.numberOfChats} */}
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
