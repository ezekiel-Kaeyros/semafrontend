import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import dropdownIcon from '../../../../../../../../public/left_side_bar_icons/dropdown.png';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import { getStatusInCookie, setStatusInCookie } from '@/cookies/cookies';
import { useDispatch } from 'react-redux';
import { setFilteredStatus } from '@/redux/features/chat-bot-slice';

export const optionsConversation = [
  {
    id: 0,
    status: 'All',
    numberOfChats: '',
    color: '',
  },
  {
    id: 1,
    status: 'start',
    numberOfChats: '10',
    color: '#157A3F',
  },
  {
    id: 2,
    status: 'open',
    numberOfChats: '4',
    color: '#182881',
  },
  {
    id: 3,
    status: 'pending',
    numberOfChats: '2',
    color: '#915103',
  },
  {
    id: 4,
    status: 'expired',
    numberOfChats: '5',
    color: '#B00020',
  },
];

interface SelectedChatProps {
  id: number;
  status: string;
  numberOfChats: string;
  color: string;
}

export type StatusFitlerProps = {
  options: Array<{
    id: number;
    status: string;
    numberOfChats: string;
    color: string;
  }>;
  handleSelect?: (id: string | number) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
};

const ConversationFilter: React.FC<StatusFitlerProps> = ({
  handleSelect,
  options,
  selectedStatus,
  onStatusChange,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
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

  const selectedStat = !selected?.status ? selected : selected?.status;

  return (
    <div className="relative">
      <AnimateClick>
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="py-3 px-4 bg-mainDarkLight flex justify-between  rounded-md h-[50px]"
        >
          {/* Selected value */}
          <div className="flex justify-center items-center gap-x-2">
            <p className="">{selectedStat}</p>
            <div
              style={{ backgroundColor: `${selectedColor}` }}
              className="w-3 h-3 p-1 text-xs rounded-full flex justify-center items-center font bold"
            ></div>
          </div>
          <div className="flex items-center ml-2">
            <div
              style={{ backgroundColor: `${selected?.color}` }}
              className={`flex justify-center font-bold items-center   p-1 w-5 h-5 text-xs rounded-full`}
            >
              {selected?.numberOfChats}
            </div>
            <Image
              className="w-4 ml-2"
              alt="Dropdown icon"
              src={dropdownIcon}
            />
          </div>
        </div>
      </AnimateClick>

      {/* Dropdown section */}
      {toggle && (
        <div className="rounded-md p-2 mt-2 shadow-lg z-10 bg-mainDarkLight absolute left-0 right-0">
          {optionsConversation
            ?.filter((option) => option.status !== selectedStat)
            .map((option, key) => (
              <AnimateClick key={key}>
                <div
                  className="py-2 px-2 flex items-center w-full justify-between rounded-md hover:bg-mainDark cursor-pointer"
                  onClick={() => {
                    handleSelect && handleSelect(option?.status),
                      setSelected(option),
                      setSeletedColor(option.color);
                    handleStatusChange(option.status);
                    setToggle((prev) => !prev);
                  }}
                >
                  {option?.status}

                  <div
                    style={{ backgroundColor: `${option?.color}` }}
                    className="w-2 h-2 p-1 text-xs rounded-full flex justify-center items-center font bold"
                  >
                    {/* {option?.numberOfChats} */}
                  </div>
                </div>
              </AnimateClick>
            ))}
        </div>
      )}
    </div>
  );
};

export default ConversationFilter;
