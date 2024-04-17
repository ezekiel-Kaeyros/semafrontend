import { Button } from '@/app/common/ui/button/Button';
import React from 'react';
import BackIcon from '../../../../../../../public/icons/chatbot/leftIcon.svg';
import PlusIcon from '../../../../../../../public/icons/chatbot/plusIcon.svg';
import Image from 'next/image';
import Link from 'next/link';

const ScenarioHeader = () => {
  return (
    <>
      <div className="flex gap-x-6 ml-2 m-8 pr-4 w-full justify-between items-center">
        <Link
          href="/dashboard/chatbot"
          className="bg-mainDarkLight flex p-2 rounded-lg"
        >
          <Image src={BackIcon} alt="Back icon" />{' '}
          <h1 className="ml-2">Back</h1>
        </Link>

        <div>
          <Button href="/dashboard/chatbot/scenarios/create" icon={PlusIcon}>
            Create a scenario
          </Button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Scenarios List</h1>
    </>
  );
};

export default ScenarioHeader;
