'use client';
import React, { useEffect, useState } from 'react';
import SendMessage from './send-message/SendMessage';
import SavedTemplates from './saved-templates/SavedTemplates';
import History from './history/History';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { BulkMessageTabTypeI } from '@/redux/features/types';

const BulkMessageContent = () => {
  const { bulkMessageTabs } = useBolkMessage();
  const [selectedTab, setSelectedTab] = useState<BulkMessageTabTypeI>();
  const findSelectedItems = () => {
    bulkMessageTabs &&
      bulkMessageTabs?.find((tab: BulkMessageTabTypeI) => {
        if (tab.selected === true) {
          setSelectedTab(tab);
          return tab;
        }
      });
    
    
  };
  console.log(selectedTab, 'tabbbbb');
  useEffect (() => {
    findSelectedItems ();
  }, [bulkMessageTabs])
  console.log('selectedTab?.id', selectedTab?.id);
  
  return (
    <>
      {selectedTab?.id === 1 ? <SendMessage /> : ''}

      {selectedTab?.id === 3 ? <SavedTemplates /> : ''}

      {selectedTab?.id === 2 && <History /> }
      
    </>
  );
};

export default BulkMessageContent;
