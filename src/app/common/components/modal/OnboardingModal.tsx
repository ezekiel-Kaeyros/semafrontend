'use client';
import Image from 'next/image';
import CustomModal from '../../ui/modal/Modal';
import logo from '../../../../../public/images/sema-logo 1.svg';
import checkTrue from '../../../../../public/images/number.svg';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import FirstStep from './step-onbaording/FirstStep';
import SecondStep from './step-onbaording/SecondStep';
import ThirdStep from './step-onbaording/ThirdStep';
import FourthStep from './step-onbaording/FourthStep';
import axios from 'axios';

const OnboardingModal: React.FC<{ isOpen?: boolean; onClose?: any }> = ({
  isOpen,
  onClose,
}) => {
    // let window:any
  (window as any).fbAsyncInit = function () {
    FB.init({
      appId: '2448667798617426',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v18.0',
    });
  };

  const sessionInfoListener = async (event: any) => {
    if (event.origin !== 'https://www.facebook.com') return;
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'WA_EMBEDDED_SIGNUP') {
        // if user finishes the Embedded Signup flow
        if (data.event === 'FINISH') {
          const { phone_number_id, waba_id } = data.data;
          const response = await axios.get(
            `https://graph.facebook.com/v19.0/${waba_id}/phone_numbers`
          );
          console.log('response', response);

          if (response.status == 200) {
            const bodyRegisterNumber = {
              pin: '341665',
              messaging_product: 'whatsapp',
            };
            const response2 = await axios.post(
              `https://graph.facebook.com/v19.0/${response.data.data[0].id}/register`,
              bodyRegisterNumber
            );
            console.log('response2', response2);

            if (response2.status == 200 && response2.data.success) {
              const bodyRegisterUser = {
                app_id: '2448667798617426',
                waba_id: waba_id,
                phone_number_id: phone_number_id,
                phone_number: response.data.data[0].phone_number.replaceAll(
                  ' ',
                  ''
                ),
                verify_token: 'francenelle',
                token:
                  'EAAizDOZAPPVIBO9sihZC4ZB0j5ft7TfMqhvPdIO38cg5ZAAbdNhczVUgHH2GiwLZCqtZANZBl1jZBrstlGfzZAJXzEUvGFN4UTNNPszoW1rM8OlRngHZBIMKivERzcbZClWPfcg2ZCVPTkhgc3EvPSAJgFFa6V7PvMGYuKO0V6ZCsnQFuEGcyIa1ImUDhT9hxvgSSjFZBJ',
              };
              const response3 = await axios.post(
                `https://nh9dzfa8o7.execute-api.eu-central-1.amazonaws.com/prod/whatsapp-access`,
                bodyRegisterUser
              );
              console.log('response3', response3);

              if (response3.status == 200) {
                setStep(4);
              }
            }
          }

          //   window.location.href = 'dashboard/bulk-messages';
        }
        // if user cancels the Embedded Signup flow
        else {
          const { current_step } = data.data;
        }
      }
    } catch {
      // Don’t parse info that’s not a JSON
      console.log('Non JSON Response', event.data);
    }
  };

  window.addEventListener('message', sessionInfoListener);
  ////////////////////////

  // Load the JavaScript SDK asynchronously
  (function (d: any, s: any, id: any) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  // Facebook Login with JavaScript SDK
  function launchWhatsAppSignup() {
    // Conversion tracking code
    //fbq && fbq('trackCustom', 'WhatsAppOnboardingStart', {appId: '2448667798617426', feature: 'whatsapp_embedded_signup'});

    // Launch Facebook login
    FB.login(
      function (response: any) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          //Use this token to call the debug_token API and get the shared WABA's ID
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      {
        config_id: '450950900606555', // configuration ID obtained in the previous step goes here
        response_type: 'code', // must be set to 'code' for System User access token
        override_default_response_type: true,
        scope: 'whatsapp_business_management, whatsapp_business_messaging',

        //   extras: {
        //     feature: 'whatsapp_embedded_signup',
        //     version: 2,
        //     sessionInfoVersion: 2,
        //     setup: {
        //       business: {
        //         name: 'Acme Inc.',
        //         email: 'johndoe@acme.com',
        //         phone: {
        //           code: 1,
        //           number: '6505551234',
        //         },
        //         website: 'https://www.acme.com',
        //         address: {
        //           streetAddress1: '1 Acme Way',
        //           city: 'Acme Town',
        //           state: 'CA',
        //           zipPostal: '94000',
        //           country: 'US',
        //         },
        //         timezone: 'UTC-08:00',
        //       },
        //       phone: {
        //         displayName: 'Acme Inc',
        //         category: 'ENTERTAIN',
        //         description: 'Acme Inc. is a leading entertainment company.',
        //       },
        //     },
        //   },
      }
    );
  }

  const [step, setStep] = useState(1);
  useEffect(() => {
    console.log(step);
  }, [step]);
  return (
    // <Modal
    //   backdrop="blur"
    //   isOpen={isOpen}
    //   onOpenChange={onClose}
    //   //   className=" sm:h-[95vh] h-screen lg:w-[69vw] sm:w-[80vw]  w-[100vw]   sm:z-10 z-[5000]"
    //   size="5xl"
    //   radius="lg"
    //   closeButton={false}
    //   placement="center"
    //   classNames={{
    //     wrapper: 'px-8 pt-10 overflow-y-auto',
    //     // body: '  ',
    //     // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
    //     // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
    //     // header: "border-b-[1px] border-[#292f46]",
    //     // footer: "border-t-[1px] border-[#292f46]",
    //     closeButton: 'hidden',
    //   }}
    // >
    //   <ModalContent>
    //     <>
    <div className=" text-white">
      {step < 4 && (
        <>
          {' '}
          <div className="flex justify-center items-center mb-9">
            <Image src={logo} alt=""></Image>
          </div>
          <h1 className="text-3xl font-bold text-white text-center ">
            Account Setup
          </h1>
          <p className="text-sm font-[500] text-center text-white">
            Get Started
          </p>
          <div className="flex gap-x-8 my-5">
            <div className="flex gap-x-2 items-center">
              {step <= 1 ? (
                <span
                  className={`h-4 w-4 justify-center p-4 flex items-center rounded-full bg-[#2196F3] ${step == 1 && 'opacity-100'}
                ${step != 1 && 'opacity-40'}`}
                >
                  1
                </span>
              ) : (
                <Image src={checkTrue} alt=""></Image>
              )}
              <span>Phone number</span>
            </div>
            <div className="flex gap-x-2 items-center">
              {step <= 2 ? (
                <span
                  className={`h-4 w-4 justify-center p-4 flex items-center rounded-full bg-[#2196F3] ${step == 2 && 'opacity-100'}
                ${step !== 2 && 'opacity-40'}`}
                >
                  2
                </span>
              ) : (
                <Image src={checkTrue} alt=""></Image>
              )}
              <span>Facebook account</span>
            </div>
            <div className="flex gap-x-2 items-center">
              {step <= 3 ? (
                <span
                  className={`h-4 w-4 justify-center p-4 flex items-center rounded-full bg-[#2196F3] ${step == 3 && 'opacity-100'}
                ${step !== 3 && 'opacity-40'}`}
                >
                  3
                </span>
              ) : (
                <Image src={checkTrue} alt=""></Image>
              )}
              <span>Business details</span>
            </div>
          </div>
        </>
      )}

      <div>
        {step == 1 && <FirstStep />}
        {step == 2 && <SecondStep />}
        {step == 3 && <ThirdStep />}
        {step == 4 && <FourthStep />}
      </div>

      {step < 4 && (
        <div className="flex justify-end items-center gap-5 mb-5">
          {step > 1 && (
            <Button
              onClick={() => {
                if (step > 1) {
                  const value = step - 1;

                  setStep(value);
                }
              }}
            >
              preview
            </Button>
          )}
          {step < 4 && (
            <Button
              className="bg-[#2196F3]"
              onClick={() => {
                if (step < 3) {
                  const value = step + 1;

                  setStep(value);
                } else {
                  launchWhatsAppSignup();
                }
              }}
            >
              continue
            </Button>
          )}
        </div>
      )}
    </div>
    //     </>
    //   </ModalContent>
    // </Modal>
  );
};
export default OnboardingModal;
