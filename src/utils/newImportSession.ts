

import axios from 'axios';
import path from 'path';
//const fs = require('fs');

export const newSessionImport = async (

  fileLength: string,

 
  image: any,
  url: string
) => {
 const data1 = { file_length: fileLength, file_type: 'image/png' };
// console.log();

  const firstResponse = await axios.post(
    `${url}/create-session/100609346426084`, data1
  );

//   console.log('first response', firstResponse);

  let uploadSessionId = firstResponse.data.id;
  const data = new FormData();
  data.append('file', image);
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
// console.log(uploadSessionId);

  const secondResponse = await axios.post(
    `${url}/import-session/100609346426084?import_session=${uploadSessionId}`,
    data,
    { headers }
  );

//   console.log('secondResponse', secondResponse);

  let imageHandle = secondResponse.data.h;

//   console.log('Image Handle', imageHandle);

  return imageHandle;
};
