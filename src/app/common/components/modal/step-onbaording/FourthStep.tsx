import Image from 'next/image';
import img2 from '../../../../../../public/images/Frame 10574.svg';
import img3 from '../../../../../../public/images/Secondary-btn.svg';
import axios from 'axios';
import { removeUserCookies } from '@/cookies/cookies';
const FourthStep: React.FC<{ reload?: any }> = ({ reload }) => {
//   (window as any).fbAsyncInit = function () {
//     FB.init({
//       appId: '2448667798617426',
//       autoLogAppEvents: true,
//       xfbml: true,
//       version: 'v18.0',
//     });
//   };

//   const sessionInfoListener = async (event: any) => {
//     if (event.origin !== 'https://www.facebook.com') return;
//     try {
//       const data = JSON.parse(event.data);
//       if (data.type === 'WA_EMBEDDED_SIGNUP') {
//         // if user finishes the Embedded Signup flow
//         if (data.event === 'FINISH') {
//           const { phone_number_id, waba_id } = data.data;
//           const response = await axios.get(
//             `https://graph.facebook.com/v19.0/${waba_id}/phone_numbers`
//           );
//           if (response.status == 200) {
//             const bodyRegisterNumber = {
//               pin: '341665',
//               messaging_product: 'whatsapp',
//             };
//             const response2 = await axios.post(
//               `https://graph.facebook.com/v19.0/${response.data.data[0].id}/register`,
//               bodyRegisterNumber
//             );
//             if (response.status == 200 && response2.data.success) {
//               const bodyRegisterUser = {
//                 app_id: '2448667798617426',
//                 waba_id: waba_id,
//                 phone_number_id: phone_number_id,
//                 phone_number: response.data.data[0].phone_number.replaceAll(' ', ''),
//                 verify_token: 'francenelle',
//                 token:
//                   'EAAizDOZAPPVIBO9sihZC4ZB0j5ft7TfMqhvPdIO38cg5ZAAbdNhczVUgHH2GiwLZCqtZANZBl1jZBrstlGfzZAJXzEUvGFN4UTNNPszoW1rM8OlRngHZBIMKivERzcbZClWPfcg2ZCVPTkhgc3EvPSAJgFFa6V7PvMGYuKO0V6ZCsnQFuEGcyIa1ImUDhT9hxvgSSjFZBJ',
//               };
//               const response3 = await axios.post(
//                 `https://nh9dzfa8o7.execute-api.eu-central-1.amazonaws.com/prod/whatsapp-access`,
//                 bodyRegisterUser
//               );
//                 if (response3.status==200) {
                    
//                 }
//             }
//           }

//           //   window.location.href = 'dashboard/bulk-messages';
//         }
//         // if user cancels the Embedded Signup flow
//         else {
//           const { current_step } = data.data;
//         }
//       }
//     } catch {
//       // Don’t parse info that’s not a JSON
//       console.log('Non JSON Response', event.data);
//     }
//   };

//   window.addEventListener('message', sessionInfoListener);
//   ////////////////////////

//   // Load the JavaScript SDK asynchronously
//   (function (d: any, s: any, id: any) {
//     var js,
//       fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     js.id = id;
//     js.src = 'https://connect.facebook.net/en_US/sdk.js';
//     fjs.parentNode.insertBefore(js, fjs);
//   })(document, 'script', 'facebook-jssdk');

//   // Facebook Login with JavaScript SDK
//   function launchWhatsAppSignup() {
//     // Conversion tracking code
//     //fbq && fbq('trackCustom', 'WhatsAppOnboardingStart', {appId: '2448667798617426', feature: 'whatsapp_embedded_signup'});

//     // Launch Facebook login
//     FB.login(
//       function (response: any) {
//         if (response.authResponse) {
//           const accessToken = response.authResponse.accessToken;
//           //Use this token to call the debug_token API and get the shared WABA's ID
//         } else {
//           console.log('User cancelled login or did not fully authorize.');
//         }
//       },
//       {
//         config_id: '450950900606555', // configuration ID obtained in the previous step goes here
//         response_type: 'code', // must be set to 'code' for System User access token
//         override_default_response_type: true,
//         scope: 'whatsapp_business_management, whatsapp_business_messaging',

//         //   extras: {
//         //     feature: 'whatsapp_embedded_signup',
//         //     version: 2,
//         //     sessionInfoVersion: 2,
//         //     setup: {
//         //       business: {
//         //         name: 'Acme Inc.',
//         //         email: 'johndoe@acme.com',
//         //         phone: {
//         //           code: 1,
//         //           number: '6505551234',
//         //         },
//         //         website: 'https://www.acme.com',
//         //         address: {
//         //           streetAddress1: '1 Acme Way',
//         //           city: 'Acme Town',
//         //           state: 'CA',
//         //           zipPostal: '94000',
//         //           country: 'US',
//         //         },
//         //         timezone: 'UTC-08:00',
//         //       },
//         //       phone: {
//         //         displayName: 'Acme Inc',
//         //         category: 'ENTERTAIN',
//         //         description: 'Acme Inc. is a leading entertainment company.',
//         //       },
//         //     },
//         //   },
//       }
//     );
//   }
  return (
    <div className="text-center">
      <div className="flex items-center justify-center">
        <Image src={img2} alt="" />
      </div>

      <p className="font-bold text-xl mt-10 mb-5">
        You can now use your Whatsapp Business Account with Sema
      </p>

      <p className="text-sm">
        You can send a bulk message to upto 100 customers today ! To increase
        the sending limit you will need to increase your phone number quality
        rating
      </p>

      <div className="flex items-center justify-center mt-14">
        <Image
          src={img3}
          alt=""
          onClick={() => {
            removeUserCookies();
            window.location.href = 'login';
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FourthStep;
