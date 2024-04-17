'use client';
import { Button } from '@/app/common/ui/button/Button';
import InputField from '@/app/common/ui/forms/text-field/InputField';
import { Spinner } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import logo from '../../../../public/logo.png';
import RadioButton from '@/app/common/ui/forms/radio/RadioButton';
import { useQuery,useMutation } from '@tanstack/react-query';
import AuthService from '@/services/authService';
import { usePathname,useRouter } from 'next/navigation';

type SignUpType = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeCondition: boolean;
  company:string
};

const SignUpModule = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathName = usePathname()
  const { push } = useRouter()
  const urlSplit=pathName.split('/')
  

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch
  } = useForm<SignUpType>({
    mode: 'onChange' || 'onBlur' || 'onSubmit',
  });
  let company = watch('company')
  let phone = watch('phone')
  let email = watch('email')
  let password=watch('password')



  const onSubmit: SubmitHandler<SignUpType> = (data) => {


    try {
     setIsLoading(true);
      const response = new AuthService()
        .register({ email, phone, password, company })
        .then((result) => {
          if (result.status == 200) {
            setIsLoading(false);
            push(`/${urlSplit[1]}/login`);
          }
        })
        .catch((errors) => {
          alert('errors?.message');

          // alert(errors?.message)
        });
   } catch (error) {
     setIsLoading(false);
   }
  };

  return (
    <form
      className="w-full h-screen flex justify-center items-center overflow-scroll"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-[400px] ">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="log" />
        </div>
        <div
          style={{
            fontFamily: 'visby-bold',
          }}
          className="w-full flex flex-col text-center mb-[2rem]"
        >
          <h1 className="text-[2.5rem] font-bold">Sign Up</h1>
          <p>Get Started</p>
        </div>

        <div className="flex flex-col gap-[1.5rem]">
          <div>
            <div>
              <InputField
                register={register('company', {
                  required: true,
                  minLength: 3,
                })}
                // icon={ShopIcon}
                style="rounded-2xl bg-inputBg2 border border-gray-300 py-[20px] px-[30px] w-full"
                name="company"
                placeholder="Shop Name"
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.email && <>A minimum of 3 characters is required</>}
            </p>
          </div>
          <div>
            <div>
              <InputField
                register={register('email', {
                  required: true,
                  minLength: 3,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                // icon={ShopIcon}
                style="rounded-2xl bg-inputBg2 border border-gray-300 py-[20px] px-[30px] w-full"
                name="email"
                placeholder="Your email"
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.email && <>the format of this email is not valid</>}
            </p>
          </div>

          <div>
            <div>
              <InputField
                // icon={ContactIcon}
                name="contact"
                type="text"
                style="rounded-2xl bg-inputBg2 border border-gray-300 py-[20px] px-[30px] w-full"
                register={register('phone', {
                  required: true,
                  pattern: /^(237)6(9|7|6|5|2|8)[0-9]{7}$/,
                })}
                placeholder="(+237)Phone Number"
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.phone && <>contact is not valid</>}
            </p>
          </div>

          <div>
            <div>
              <InputField
                // icon={UserIcon}
                style="rounded-2xl bg-inputBg2 border border-gray-300 py-[20px] px-[30px] w-full"
                register={register('password', {
                  required: true,
                  minLength: 6,
                })}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.password && <> A minimum of 3 characters is required</>}
            </p>
          </div>

          <div>
            <div>
              <InputField
                // icon={UserIcon}
                style="rounded-2xl bg-inputBg2 border border-gray-300 py-[20px] px-[30px] w-full"
                register={register('confirmPassword', {
                  required: true,
                  minLength: 6,
                })}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
            <p className="mt-1 text-sm text-red-400">
              {errors?.confirmPassword && (
                <> A minimum of 3 characters is required</>
              )}
            </p>
          </div>
        </div>

        {/* Search field */}

        <div className="mt-4">
          <RadioButton
            register={register('confirmPassword', { required: true })}
            name={'agreeCondition'}
            linkLabel1={'Privacy Policy'}
            linkLabel2={'Cookies Policy'}
            title={'By clicking Sign Up You agree to our Term,'}
            link1={'/'}
            link2={'/'}
          />
          <p className="mt-1 text-sm text-red-400">
            {errors?.agreeCondition && (
              <> A minimum of 3 characters is required</>
            )}
          </p>
        </div>
        <div className="w-full my-8">
          <Button
            disabled={!isValid || isLoading ? true : false}
            variant={!isValid || isLoading ? 'disabled' : 'mainColor'}
            className="w-full py-4"
          >
            {isLoading ? (
              <Spinner size="sm" color="white" />
            ) : (
              <>Create Account</>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignUpModule;
