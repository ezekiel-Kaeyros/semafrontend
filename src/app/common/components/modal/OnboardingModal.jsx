'use client';
import Image from 'next/image';
//import CustomModal from '../../ui/modal/Modal';
import logo from '../../../../../public/images/sema-logo 1.svg';
import checkTrue from '../../../../../public/images/number.svg';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import FirstStep from './step-onbaording/FirstStep';
import SecondStep from './step-onbaording/SecondStep';
import ThirdStep from './step-onbaording/ThirdStep';
import FourthStep from './step-onbaording/FourthStep';
import axios from 'axios';

const OnboardingModal = () => {
  const [step, setStep] = useState(1);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(0);
  const [wabaId, setWabaId] = useState('');
  // const [number, setNumber] = useState('');
  // const [name, setName] = useState('');
  const [numberId, setNumberId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // let window:any
  window.fbAsyncInit = function () {
    console.log('step1 {');
    FB.init({
      appId: '2448667798617426',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v18.0',
    });
  };
  const registerHandler = async (number_id, waba_id) => {
    const headers = {
      Authorization:
        'Bearer EAAizDOZAPPVIBO4gI0oBhSRcxsegaJNHwAij2SJ1vJ8Ai3W3qijw6MoY4YZCLafsrPMZCrO14IVFZCNNZBe9YXHOrBopmGYojBdzcjM96v0pZByDV5k3mMMKcNwpVaga169GV8D70e90u9frQ499t7WPRPUkpMZAitJPBOnFc26PZCJvOzLXjcPHuZCIafh4Y',
    };
    console.log(
      'https://graph.facebook.com/v19.0/' + waba_id + '/phone_numbers'
    );
    console.log('numberId', number_id);
    console.log('waba_id', waba_id);
    try {
      setLoad(true);
      console.log('numberId', number_id);
      console.log('waba_id', waba_id);
      const response = await axios({
        method: 'GET',
        url: `https://graph.facebook.com/v19.0/${waba_id}/phone_numbers`,
        headers: {
          Authorization:
            'Bearer EAAizDOZAPPVIBO4gI0oBhSRcxsegaJNHwAij2SJ1vJ8Ai3W3qijw6MoY4YZCLafsrPMZCrO14IVFZCNNZBe9YXHOrBopmGYojBdzcjM96v0pZByDV5k3mMMKcNwpVaga169GV8D70e90u9frQ499t7WPRPUkpMZAitJPBOnFc26PZCJvOzLXjcPHuZCIafh4Y',
        },
      });
      console.log('response', response);

      if (response.status == 200 || response.status == 201) {
        setNumber(response.data.data[0].display_phone_number);
        setName(response.data.data[0].verified_names);
        const bodyRegisterNumber = {
          pin: '341665',
          messaging_product: 'whatsapp',
        };
        const response2 = await axios.post(
          `https://graph.facebook.com/v19.0/${response.data.data[0].id}/register`,
          bodyRegisterNumber,
          { headers }
        );
        console.log('response2', response2);

        if (
          (response2.status == 200 || response2.status == 201) &&
          response2.data.success
        ) {
          setStep(4);

          setName(response.data.data[0].verified_name);
          setNumber(
            response.data.data[0].display_phone_number.replaceAll(' ', '')
          );

          setLoad(false);
          setError(0);
        } else {
          setLoad(false);
          setError(1);
          return response2.status;
        }
      } else {
        setLoad(false);

        setError(1);
        return response.status;
      }
    } catch (error) {
      setLoad(false);
      setError(1);
      return error;
    }
  };

  const sessionInfoListener = async (event) => {
    console.log('11111b11111111');

    if (event.origin !== 'https://www.facebook.com') return;
    try {
      console.log('222222222222');
      console.log('event', event);
      const data = JSON.parse(event.data);
      console.log('data', data);
      if (data.type === 'WA_EMBEDDED_SIGNUP') {
        // if user finishes the Embedded Signup flow
        console.log('ok11111');

        if (data.event === 'FINISH') {
          const { phone_number_id, waba_id } = data.data;

          setWabaId(waba_id);
          setNumberId(phone_number_id);

          //   window.location.href = 'dashboard/bulk-messages';
        }
        // if user cancels the Embedded Signup flow
        else {
          console.log('333333333333333333');

          const { current_step } = data.data;
        }
      }
    } catch (error) {
      console.log('444444444444444');
      console.log(error);

      // Don’t parse info that’s not a JSON
      console.log('Non JSON Response', event.data);
    }
  };

  window.addEventListener('message', sessionInfoListener);
  ////////////////////////

  // Load the JavaScript SDK asynchronously
  (function (d, s, id) {
    console.log('step2 {{');

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
    console.log('step3{{{{{');

    // Conversion tracking code
    //fbq && fbq('trackCustom', 'WhatsAppOnboardingStart', {appId: '2448667798617426', feature: 'whatsapp_embedded_signup'});

    // Launch Facebook login
    FB.login(
      function (response) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          console.log('accessToken', accessToken);
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

        extras: {
          feature: 'whatsapp_embedded_signup',
          version: 2,
          sessionInfoVersion: 2,
          setup: {
            business: {
              name: 'Acme Inc.',
              email: 'johndoe@acme.com',
              phone: {
                code: 1,
                number: '6505551234',
              },
              website: 'https://www.acme.com',
              address: {
                streetAddress1: '1 Acme Way',
                city: 'Acme Town',
                state: 'CA',
                zipPostal: '94000',
                country: 'US',
              },
              timezone: 'UTC-08:00',
            },
            phone: {
              displayName: 'Acme Inc',
              category: 'ENTERTAIN',
              description: 'Acme Inc. is a leading entertainment company.',
            },
          },
        },
      }
    );
  }

  useEffect(() => {
    if (
      step == 3 &&
      numberId.length > 0 &&
      wabaId.length > 0 
   //   name.length == 0 &&
   //   number.length == 0
    ) {
      console.log('testing');
      registerHandler(numberId, wabaId);
    }
  }, [step, numberId, wabaId, error, name, number]);
  return (
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
        {step == 4 && (
          <FourthStep
            load={load}
            error={error}
            name={name}
            numberId={numberId}
            number={number}
            waba_id={wabaId}
          />
        )}
      </div>

      {error > 0 && (
        <p className="mt-5 mb-10 font-bold text-[red] text-center">
          something wrong try later
        </p>
      )}

      {step < 4 && (
        <div className="flex justify-end items-center gap-5 mb-5">
          {step > 1 && (
            <Button
              className={`${load ? 'opacity-40' : 'opacity-100'}`}
              disabled={load}
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
              disabled={load}
              className={`bg-[#2196F3] ${load ? 'opacity-40' : 'opacity-100'}`}
              onClick={async () => {
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
  );
};
export default OnboardingModal;
