import React from 'react';
import EmptyHistory from './empty-history/EmptyHistory';

import FilledBulkMessage from '../saved-templates/filled-bulk-message/FilledBulkMessage';

import { useQuery } from '@tanstack/react-query';
import {BulkMessagesService} from '@/services';
import App from '@/app/common/ui/table/CustomTable';
// import App from './tableBulk/TableBulk';
const History = () => {
     const { data: posts,isLoading } = useQuery({
       queryKey: ['getTempleteSession'],
       queryFn: new BulkMessagesService().getTemplateSession,
     });
  
  return (
    <div>
      {!isLoading && posts && posts?.data && posts?.data.length > 0 &&
        // <FilledBulkMessage />
        <App tableSession={posts.data} />}
      {!isLoading && posts && posts?.data && posts?.data.length == 0 &&
        <EmptyHistory />
      }

      {isLoading && <p className='text-center text-2xl'>
      chargement patientez...</p>}
    
    </div>
  );
};

export default History;
