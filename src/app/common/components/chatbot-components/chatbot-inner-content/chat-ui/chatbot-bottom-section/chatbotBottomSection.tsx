'use client';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import Image from 'next/image';
import React, { Suspense, useState } from 'react';
import attachementIcons from '../../../../../../../../public/message_container_icons/text_pane_icons/attachement.png';
import emojieIcons from '../../../../../../../../public/message_container_icons/text_pane_icons/emojie.png';
import picturePhotosVideosIcon from '../../../../../../../../public/message_container_icons/text_pane_icons/picturePhotosVideos.png';
import sendIconIcon from '../../../../../../../../public/message_container_icons/text_pane_icons/sendIcon.png';

import InputField from '@/app/common/ui/forms/text-field/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/app/common/ui/button/Button';
import EmojiPicker from 'emoji-picker-react';
import { useClickOutside } from '@/app/hooks/useClickOutside';
import { addChat } from '@/redux/features/chat-bot-slice';
import { useChatBot } from '@/app/hooks/useChatBot';
import { ChatbotService } from '@/services';
import { Toaster, toast } from 'react-hot-toast';

type ActivityFormValues = {
  message: string;
};

const ChatbotBottomSection: React.FC<{ number?: string; numberId: string }> = ({
  number,
  numberId,
}) => {
  const { register, handleSubmit, reset, watch } =
    useForm<ActivityFormValues>();
  let message = watch('message');
  const [showEmojis, setShowEmojis] = useState(false);
  const [load, setload] = useState(false);

  const [clientToggle, setClientToggle] = useState(true);
  const [generatedID, setGeneratedID] = useState(1);
  const { chatsCompany } = useChatBot();
  const handleShowEmojie = () => {
    setShowEmojis((showEmojis) => !showEmojis);
  };

  const handleCloseShowEmojie = () => {
    setShowEmojis(false);
  };

  const ref = useClickOutside(() => handleCloseShowEmojie());

  const { conversations, selectedConversation, dispatch } = useChatBot();

  const onSubmit: SubmitHandler<ActivityFormValues> = async (data) => {
    setload(true);
    const response = new ChatbotService()
      .sendchat({
        ...data,
        phone_number: number!,
        phone_number_id: chatsCompany.phone_number_id,
      })
      .then((result) => {
        if (result.status == 200) {
          // ;
          setload(false);
          reset();
          toast.success('envoyé');
        }
      })
      .catch((error) => {
        // ;
        setload(false);
        toast.error(
          "échec d'envoie de messages surement la session est terminée"
        );
      });
    // setGeneratedID((generatedID) => generatedID + 1);

    // setClientToggle((clientToggle) => !clientToggle);

    // if (clientToggle) {
    //   data = {
    //     selectedConversation: selectedConversation,
    //     conversations: conversations,
    //     id: generatedID,
    //     message: data.message,
    //     messageTime: new Date().toString(),
    //     client: true,
    //     name: 'Thierry Monthé',
    //   };
    // } else {
    //   data = {
    //     selectedConversation: selectedConversation,
    //     conversations: conversations,
    //     id: generatedID,
    //     message: data.message,
    //     messageTime: new Date().toString(),
    //     client: true,
    //     name: 'VitalMove Therapy Center',
    //   };
    // }

    // // ;
    // reset();

    // dispatch(addChat(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" px-5 flex flex-row  right-0 first-letter:  justify-between  border-slate-600  w-full rounded-full dark:bg-mainDarkLight border-t-[0.02px]  "
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="md:w-[85%] w-full flex justify-between items-center">
        <div className="w-full bg-mainDark rounded-full mr-8">
          <InputField
            name="message"
            register={register('message', { required: true })}
            placeholder="Type message here or start / with a fast reply"
          />
        </div>

        <Image
          src={attachementIcons}
          alt="Notification icon"
          className="h-8 w-8"
        />
        <div className="cursor-pointer mx-2 relative ">
          <div
            ref={ref}
            className={`absolute ${
              showEmojis ? 'bottom-[0%]' : 'hidden'
            } bottom-[100%]`}
          >
            <Suspense>{/* <EmojiPicker /> */}</Suspense>
          </div>
          <Image
            onClick={() => handleShowEmojie()}
            src={emojieIcons}
            alt="Notification icon"
            className="h-8 w-8"
          />
        </div>
        <Image
          src={picturePhotosVideosIcon}
          alt="Notification icon"
          className="h-8 w-8"
        />
      </div>
      <div className="md:flex items-center py-2  justify-end hidden">
        <div className="ml-8">
          <Button
            disabled={load || !message ? true : false}
            variant={!load && message ? 'default' : 'disabled'}
            // onClick={() => {
            //   alert(message);
            // }}
            rightIcon={sendIconIcon}
          >
            {load ? 'sending...' : 'Send'}
          </Button>
        </div>
      </div>

      <div className=" grid-cols-4 mt-[1.3rem] items-center gap-[1rem] hidden">
        <AnimateClick>
          <div className="cursor-pointer w-12 h-12 p-1 flex items-center justify-center">
            <Image src={attachementIcons} width={30} alt="Notification icon" />
          </div>
        </AnimateClick>

        <AnimateClick>
          <div className="cursor-pointer relative w-12 h-12 p-1 flex items-center justify-center">
            <div
              ref={ref}
              className={`absolute ${
                showEmojis ? 'bottom-[0%]' : 'hidden'
              } bottom-[100%]`}
            >
              {/* <EmojiPicker /> */}
            </div>
            <Image
              onClick={() => handleShowEmojie()}
              src={emojieIcons}
              width={30}
              alt="Notification icon"
            />
          </div>
        </AnimateClick>

        <AnimateClick>
          <div className="cursor-pointer w-12 h-12 p-1 flex items-center justify-center">
            <Image
              src={picturePhotosVideosIcon}
              width={30}
              alt="Notification icon"
            />
          </div>
        </AnimateClick>
        <Button
          variant={'mainColor'}
          icon={sendIconIcon}
          rightIcon={true}
          iconSize={30}
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default ChatbotBottomSection;
