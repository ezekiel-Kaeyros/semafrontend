import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import dropdownIcon from '../../../../../../../../public/left_side_bar_icons/dropdown.png';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import { getStatusInCookie, setStatusInCookie } from '@/cookies/cookies';
import { useDispatch, useSelector } from 'react-redux';
import {
  setArrayStatus,
  setConversationStatus,
  setCurrentChatStatus,
  setFilteredStatus,
  setLoadingStatus,
} from '@/redux/features/chat-bot-slice';
import { RootState } from '@/redux/store';
import { usePathname } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export const optionsConversation = [
  // {
  //   id: 0,
  //   status: 'None',
  //   numberOfChats: '',
  //   color: '',
  // },
  // {
  //   id: 1,
  //   status: 'start',
  //   numberOfChats: '10',
  //   color: '#157A3F',
  // },
  {
    id: 1,
    status: 'open',
    numberOfChats: '4',
    color: '#182881',
  },
  {
    id: 2,
    status: 'pending',
    numberOfChats: '2',
    color: '#915103',
  },
  // {
  //   id: 4,
  //   status: 'expired',
  //   numberOfChats: '5',
  //   color: '#B00020',
  // },
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
  const pathname = usePathname();
  const currentId = pathname.split('/').pop();
  const { currentChatStatus } = useSelector(
    (state: RootState) => state.setCurrentChatStatus
  );
  const { arrayStatus } = useSelector(
    (state: RootState) => state.setArrayStatus
  );
  const { companyId } = useSelector((state: RootState) => state.setCompanyId);
  const [toggle, setToggle] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectedChatProps | any>(
    // getStatusInCookie(options[0].status)
    // optionsConversation[0].status
    currentChatStatus
  );
  const [selectedColor, setSeletedColor] = useState('');
  const dispatch = useDispatch();
  const { companychats } = useSelector(
    (state: RootState) => state.setCompanyChats
  );

  const API_STATUS_URL =
    'https://back.chatbot.sem-a.com/chats/update-status-conversation';

  const handleStatusChange = (status: string | any) => {
    setSelected(status);
    onStatusChange(status);
    dispatch(setFilteredStatus(status));
    dispatch(setCurrentChatStatus(status));
    dispatch(setArrayStatus({ id: currentId, status: status }));
    updateStatus(status, companyId, currentId);
    // setSelected(getStatusInCookie(status));
    // onStatusChange(getStatusInCookie(status));
    // setStatusInCookie(status);
  };

  // function to update Status.
  async function updateStatus(
    status: string,
    companyId: string,
    phone_number: any
  ) {
    const Statusdata = {
      status: status,
      phone_number_id: companyId,
      phone_number: phone_number,
    };

    // http://localhost:3300/chats/update-status-conversation
    // http://back.chatbot.sem-a.com/chats/update-status-conversation

    dispatch(setLoadingStatus(true));
    // try {
    //   console.log('above response');
    //   const response = await fetch(
    //     'http://back.chatbot.sem-a.com/chats/update-status-conversation',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(Statusdata), // Send the status in the request body
    //     }
    //   );
    //   console.log(response, 'outside if');
    //   if (!response.ok) {
    //     console.log(response, 'inside if');
    //     dispatch(setLoadingStatus(false));
    //     toast.error('Status could not be updated, Please try again');
    //     console.log(response, 'inside if below toast');
    //     throw new Error('Network response was not ok');
    //   }

    //   const data = await response.json();
    //   toast.success('Status Updated');
    //   dispatch(setLoadingStatus(false));
    // } catch (error) {
    //   console.error('Error updating status:', error);
    //   dispatch(setLoadingStatus(false));
    // }

    try {
      console.log('above response');
      const response = await axios.post(
        API_STATUS_URL,
        Statusdata, // Send the status in the request body
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response, 'outside if');

      if (response.status !== 200) {
        console.log(response, 'inside if');
        dispatch(setLoadingStatus(false));
        toast.error('Status could not be updated, Please try again');
        console.log(response, 'inside if below toast');
        throw new Error('Network response was not ok');
      }

      toast.success('Status Updated');
      dispatch(setLoadingStatus(false));
    } catch (error) {
      console.error('Error updating status:', error);
      dispatch(setLoadingStatus(false));
    }
  }

  return (
    <div className="relative">
      <Toaster />
      <AnimateClick>
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="py-3 px-4 bg-mainDarkLight flex rounded-md h-[50px]"
        >
          {/* Selected value */}
          <div className="flex justify-center items-center gap-x-2">
            <p className="">Status: {currentChatStatus && currentChatStatus}</p>
            <div
              style={{ backgroundColor: `${selectedColor}` }}
              className="w-3 h-3 p-1 text-xs rounded-full flex justify-center items-center font bold"
            ></div>
          </div>
          <div className="flex items-center">
            {currentChatStatus !== 'expired' && (
              <Image
                className="w-4 ml-2"
                alt="Dropdown icon"
                src={dropdownIcon}
              />
            )}
          </div>
        </div>
      </AnimateClick>

      {/* Dropdown section */}
      {toggle && currentChatStatus !== 'expired' && (
        <div className="rounded-md p-2 mt-2 shadow-lg z-10 bg-mainDarkLight absolute left-0 right-0">
          {optionsConversation
            ?.filter((option) => option.status !== currentChatStatus)
            .map((option, key) => {
              // console.log(option.color, 'selectedColor');
              return (
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
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ConversationFilter;
