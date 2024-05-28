import React from 'react';
import EmptyHistory from './empty-history/EmptyHistory';

import FilledBulkMessage from '../saved-templates/filled-bulk-message/FilledBulkMessage';
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { BulkMessagesService } from '@/services';
import App from '@/app/common/ui/table/CustomTable';
// import App from './tableBulk/TableBulk';
const History = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['getTempleteSession'],
    queryFn: new BulkMessagesService().getTemplateSession,
  });
  return (
    <div>
      {isLoading ? (
        <p className="text-center text-2xl h-[70vh] flex place-items-center w-full justify-center">
          {/* <p>chargement patientez...</p> */}
          <Spinner label="Loading . . . " color="primary" size='lg' />
        </p>
      ) : posts && posts?.data && posts?.data.length > 0 ? (
        // console.log(posts)

       
          <App tableSession={posts.data.reverse()} />
        
      ) : (
        <EmptyHistory />
      )}
    </div>
  );
};

export default History;
