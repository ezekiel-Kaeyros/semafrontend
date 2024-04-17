'use client';
import { Button } from '@/app/common/ui/button/Button';
import InputField from '@/app/common/ui/forms/text-field/InputField';
import { Spinner } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';

import loginUserIcon from '../../../../public/icons/userIcon.svg';
import logo from '../../../../public/logo.png';
import greyPasswordIcon from '../../../../public/icons/greyPassword.png';
import AuthService from '@/services/authService';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { login } from '@/redux/features/auth-slice';
import { setUserCookies } from '@/cookies/cookies';


type SignInType = {
  email: string;
  contact: number;
  password: string;
  confirmPassword: string;
};

const SignInModule = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {dispatch }=useAuth()
   const pathName = usePathname();
   const { push } = useRouter();
   const urlSplit = pathName.split('/');
  const {
    register,
    handleSubmit,
  
   formState: { errors, isValid }
   
  } = useForm<SignInType>({
    mode: 'onChange' || 'onBlur' || 'onSubmit',
  });

 
 






 



  const onSubmit: SubmitHandler<SignInType> = (data) => {
    try {
    setIsLoading(true)
      const response = new AuthService().login2(data).then((result) => {
        if (result.status == 200) {
           setUserCookies(result.data);
        dispatch(login(result.data))
        push(`/${urlSplit[1]}/dashboard`);
      }
      }).catch((error) => {
        alert('something wrong try again')
         setIsLoading(false);
      });
    } catch (error) {
       setIsLoading(false);
    console.error(error);
    
  }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        fontFamily: 'visby-regular',
      }}
      className="w-full h-screen flex justify-center items-center"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-[400px]">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="log" />
        </div>
        <div>
          <h1
            style={{
              fontFamily: 'visby-bold',
            }}
            className="text-[2.5rem] font-bold"
          >
            Log In to <span className="text-mainColor">Marketit Business</span>{' '}
          </h1>
        </div>

        <div className="flex flex-col gap-[2rem]">
          <div className="mb-[-16px]">
            <div>
              <InputField
                register={register('email', { required: true, minLength: 3 })}
                icon={loginUserIcon}
                name="email"
                placeholder="Email / Phone Number"
              />
            </div>
            <p className="mt-2 text-sm text-red-400">
              {errors?.email && <>Email or phone number not valid</>}
            </p>
          </div>

          <div className="">
            <div>
              <InputField
                icon={greyPasswordIcon}
                register={register('password', {
                  required: true,
                  minLength: 6,
                })}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <p className="mt-2 text-sm text-red-400">
              {errors?.password && <> A minimum of 3 characters is required</>}
            </p>
          </div>
        </div>

        <div>
          <p className="dark:text-white mt-4">
            Forgotten your password?
            <Link href={'/'} className="text-mainColor ml-2">
              Reset Password
            </Link>
          </p>
          <div className="w-full my-8">
            <Button
              disabled={!isValid || isLoading ? true : false}
              variant={!isValid || isLoading ? 'disabled' : 'mainColor'}
              type="submit"
              className="w-full py-4"
            >
              {isLoading ? <Spinner size="sm" color="white" /> : <>Login</>}
            </Button>
          </div>
        </div>

        <div className="w-full my-8">
          <p className="mb-[1rem] text-center">Don&apos;t have an account ?</p>
          <Button href="/signup" variant="outline" className="w-full py-4">
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignInModule;
