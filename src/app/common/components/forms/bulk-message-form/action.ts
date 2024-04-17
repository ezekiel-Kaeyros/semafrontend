'use server';

import { revalidatePath } from 'next/cache';

export const postBulkMessageTemplate = async (bulkMessageTemplate: any) => {
  'use server';
  let response;

  try {
    await fetch(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/template/100609346426084',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bulkMessageTemplate),
      }
    ).then((result) => {
      console.log('post succeeded', result);
      response = result.json();
      return result.json();
    });
  } catch (error) {
    console.log('There was and error creating the template', error);
  }

  revalidatePath('/dashboard/bulk-messages');
  return response;
};