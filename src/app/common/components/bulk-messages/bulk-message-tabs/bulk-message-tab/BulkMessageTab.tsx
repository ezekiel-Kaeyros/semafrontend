'use client';
import React from 'react';
import { BulkMessageTabType } from './bulkMessageTab.d';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { changeTab } from '@/redux/features/bulk-message-slice';

const BulkMessageTab: React.FC<BulkMessageTabType> = ({
  tabData,
  id,
  label,
  selected,
  func,
}) => {
  const { dispatch }: { dispatch: any } = useBolkMessage();

  const data = {
    tabData,
    id,
  };

  return (
    <div
      onClick={() => dispatch(changeTab(data))}
      className={`${selected && "before:content-[''] relative before:absolute before:h-[1px] before:bg-blueLine before:-bottom-[2px] before:left-0 before:w-full"} flex items-center cursor-pointer transition-all duration-300 ease-in-out delay-150`}
    >
      {label}
    </div>
  );
};

export default BulkMessageTab;
