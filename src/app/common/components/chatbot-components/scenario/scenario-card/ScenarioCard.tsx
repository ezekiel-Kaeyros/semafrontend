import React from 'react';
import Image from 'next/image';

import { ScenarioCardProps } from './ScenarioCard.d';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import EditIcon from '../../../../../../../public/icons/chatbot/editIcon.svg';
import DeleteIcon from '../../../../../../../public/icons/chatbot/deleteIcon.svg';

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  isActive,
  name,
  numberOfQuestions,
}) => {
  return (
    <div className="rounded-lg p-4 bg-mainDarkLight w-64 max-w-lg">
      <div className="flex justify-between items-center">
        <h1>{name}</h1>
        {(isActive && (
          <div className="px-3 py-.5 bg-[#E9FBF1] rounded-full">
            <h1 className="text-[#157A3F]">Active</h1>
          </div>
        )) || (
          <div className="px-3 py-.5 bg-[#FFDBE2] rounded-full">
            <h1 className="text-[#B00020]">Inactive</h1>
          </div>
        )}
      </div>
      <div className="flex my-6 justify-between">
        <h1>Questions</h1>
        <h1>{numberOfQuestions}</h1>
      </div>
      {/* Actions section */}
      <div className="ml-auto flex gap-x-2 w-fit">
        <AnimateClick>
          <Image src={EditIcon} alt="Edit icon" />
        </AnimateClick>
        <AnimateClick>
          <Image src={DeleteIcon} alt="Delete icon" />
        </AnimateClick>
      </div>
    </div>
  );
};

export default ScenarioCard;
