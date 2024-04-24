import React from 'react';
import EmptyHistory from './empty-history/EmptyHistory';

import FilledBulkMessage from '../saved-templates/filled-bulk-message/FilledBulkMessage';

import { useQuery } from '@tanstack/react-query';
import {BulkMessagesService} from '@/services';
const History = () => {
     const { data: posts } = useQuery({
       queryKey: ['getTempleteSession'],
       queryFn: new BulkMessagesService().getTemplateSession,
     });
  
  return (
    <div>
      {posts && posts?.data && posts?.data.length > 0 ? (
        <FilledBulkMessage />
      ) : (
        <EmptyHistory />
      )}
    
    </div>
  );
};

export default History;
