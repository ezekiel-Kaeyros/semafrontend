import React, { useState } from 'react';
import Image from 'next/image';

import dropdownIcon from '../../../../../../../../public/left_side_bar_icons/dropdown.png';
import { StatusFitlerProps } from './StatusFilter.d';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';

const StatusFitler: React.FC<StatusFitlerProps> = ({
  handleSelect,
  options,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="relative">
      <AnimateClick>
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="py-3 px-4 bg-mainDarkLight flex justify-between  rounded-md"
        >
          {/* Selected value */}
          <h1 className="">{selected?.status}</h1>
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
        <div className="rounded-md p-4 mt-2 shadow-lg z-10 bg-mainDarkLight absolute left-0 right-0">
          {options?.map((option, key) => (
            <AnimateClick key={key}>
              <div
                className="py-2 px-2 flex justify-between rounded-md hover:bg-mainDark cursor-pointer"
                onClick={() => {
                  handleSelect && handleSelect(option?.status),
                    setSelected(option),
                    setToggle((prev) => !prev);
                }}
              >
                {option?.status}

                <div
                  style={{ backgroundColor: `${option?.color}` }}
                  className="w-5 h-5 p-1 text-xs rounded-full flex justify-center items-center font bold"
                >
                  {option?.numberOfChats}
                </div>
              </div>
            </AnimateClick>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusFitler;