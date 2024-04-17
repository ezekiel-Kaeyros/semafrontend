'use client';
import React, { useState } from 'react';
import { BulkMessageTabType } from './bulk-message-tab/bulkMessageTab';
import BulkMessageTab from './bulk-message-tab/BulkMessageTab';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { BulkMessageTabTypeI } from '@/redux/features/types';

const tabDataAll = [
  {
    id: 1,
    label: 'Send Message',
    selected: true,
  },
  {
    id: 2,
    label: 'History ',
    selected: false,
  },
  {
    id: 3,
    label: 'Templates',
    selected: false,
  },
];

const BulkMessageTabs = () => {
  const {
    bulkMessageTabs,
  }: { dispatch: any; bulkMessageTabs: BulkMessageTabTypeI[] } =
    useBolkMessage();

  return (
    <>
      {bulkMessageTabs &&
        bulkMessageTabs?.map((tab: BulkMessageTabType) => (
          <BulkMessageTab
            tabData={bulkMessageTabs}
            key={tab?.id}
            id={tab?.id}
            label={tab?.label}
            selected={tab?.selected}
          />
        ))}
    </>
  );
};

export default BulkMessageTabs;
