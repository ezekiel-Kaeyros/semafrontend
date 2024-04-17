'use client';
import { Button } from '@/app/common/ui/button/Button';
import React, { useState } from 'react';

import bulk_messageIcon from '../../../../public/right_side_bar/bulk_message.png';
import BulkMessageTabs from '@/app/common/components/bulk-messages/bulk-message-tabs/BulkMessageTabs';
import BulkMessageContent from '@/app/common/components/bulk-messages/bulk-message-content/BulkMessageContent';
import CustomModal from '@/app/common/ui/modal/Modal';
import { useModal } from '@/app/hooks/useModal';
import {
  toggleCloseModal,
  toggleOpenModal,
} from '@/redux/features/modal-slice';
import BulkMessageForm from '@/app/common/components/forms/bulk-message-form/BulkMessageForm';
import ChoosePricing from '@/app/common/components/bulk-messages/payment-mode/choose-pricing/ChoosePricing';
import { useQuery } from '@tanstack/react-query';
import AuthService from '@/services/authService';

const BulkMessage = () => {
  const { modalTogle, dispatch } = useModal();
  const [modalPricing, setModalPricing] = useState(false);
  const viewPricingHandler = () => {
    setModalPricing((modalPricing) => !modalPricing);
  };
  const handleOnClickOpenModal = () => {
    dispatch(toggleOpenModal(true));
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['postsData'],
    queryFn: new AuthService().retrievePosts,
  });

  console.log('data', posts);
  console.log('is loading', isLoading);
  console.log('error', error);

  const handleOnClickCloseModal = () => {
    dispatch(toggleCloseModal(false));
  };

  return (
    <>
      <div className="px-[1rem] py-[2rem]">
        <div>
          <h1
            style={{
              fontFamily: 'visby-bold',
            }}
            className="text-[32px]"
          >
            Bulk Message
          </h1>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-[1rem]">
            <BulkMessageTabs />
          </div>
          <div>
            <Button
              leftIcon={bulk_messageIcon}
              iconSize={30}
              onClick={() => handleOnClickOpenModal()}
            >
              Create Template
            </Button>
          </div>
        </div>
        <div className="p-[1rem]">
          <BulkMessageContent />
          {/* <Button
            variant={'mainColor'}
            icon={bulk_messageIcon}
            leftIcon={bulk_messageIcon}
            iconSize={30}
            className="w-auto mt-6"
            onClick={viewPricingHandler}
          >
            view Pricing
          </Button> */}
        </div>
      </div>

      <ChoosePricing view={modalPricing} close={viewPricingHandler} />
      <CustomModal
        title={''}
        // showFooter={false}
        isOpen={modalTogle}
        closeButtonTitle={'close'}
        validateButtonTitle={'Create'}
        onClose={() => handleOnClickCloseModal()}
        classStyle={'bg-mainDark max-w-screen-lg w-[1000px]'}
        iconTitle={'icon'}
      >
        <BulkMessageForm modalHandler={handleOnClickCloseModal} />
      </CustomModal>
    </>
  );
};

export default BulkMessage;
