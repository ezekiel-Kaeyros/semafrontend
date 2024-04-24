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
    <span
      onClick={() => dispatch(changeTab(data))}
      className={`${selected ? 'border-b-[2px] border-mainColor' : ''} flex items-center cursor-pointer transition-all duration-300 ease-in-out delay-150`}
    >
      {label}
    </span>
  );
};

export default BulkMessageTab;
