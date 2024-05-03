import React from 'react';
import { ImageNodeType } from './types';
import Image from 'next/image';
import trashIcon from '../../../../../../../../../../../public/icons/chatbot/trash.svg';

import galleryIcon from '../../../../../../../../../../../public/icons/chatbot/gallery-import.svg';

function ImageNode({ id, deletefc }: ImageNodeType) {
  function deleteMe() {}
  return (
    <div className="bg-mainDarkLight  w-full rounded-lg  nodrag p-2 ">
      <div className=" flex justify-end w-full  pt-2 ">
        <Image
          src={trashIcon}
          alt=""
          width={12}
          height={12}
          className=" nodrag cursor-pointer"
          onClick={() => deletefc(id)}
        />
      </div>
      <div className=" flex justify-center place-items-center">
        <Image
          src={galleryIcon}
          alt=""
          width={32}
          height={32}
          className=" nodrag cursor-pointer"
          onClick={() => deletefc(id)}
        />
      </div>
      <div className=" flex justify-center bg-gray-700 w-full text-[12px] py-1.5 mt-2 nodrag rounded-sm ">
        <p>Upload image</p>
      </div>
    </div>
  );
}

export { ImageNode };
