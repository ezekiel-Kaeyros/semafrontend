import Image from 'next/image';
import React from 'react';

type InputFieldProps = {
  register?: any;
  icon1?: any;
  icon?: any;
  icon2?: any;
  title?: string;
  width?: any;
  height?: any;
  style?: string;
  name?: any;
  placeholder?: any;
  type?: any;
  reference?: any;
  func?: any;
  numberI?: any;
  classes?: string;
  labelTextStyle?: string;
  action?: any;
};

const InputField: React.FC<InputFieldProps> = ({
  register,
  title,
  name,
  icon1,
  icon,
  icon2,
  placeholder,
  type,
  classes,
  width,
  height,
  reference,
  action,
  style,
}) => {
  return (
    <>
      {title && (
        <label
          className={` font-bold block mb-3 text-gray-700 dark:text-white`}
          htmlFor={name}
        >
          {title}
        </label>
      )}
      <div className={`relative w-full  ${classes} `}>
        <input
          className={` appearance-none dark:bg-mainDarkLight focus:dark:outline-primary dark:text-white focus:dark:bg-mainDarkLight border border-slate-700 relative w-full leading-tight bg-transparent  rounded-xl py-4 ${icon1 || icon ? 'pl-[12%] ' : 'pl-6'} ${icon2 ? ' pr-[12%]' : 'pr-6'}  focus:border-primary' focus:outline-none`}
          id={name}
          type={type ? type : 'text'}
          placeholder={placeholder}
          autoComplete="off"
          autoFocus
          ref={(el) => {
            reference.current = el;
          }}
          // style={{
          //   fontFamily: 'visby-regular',
          // }}
          {...register}
        />
        {icon1 ||
          (icon && (
            <Image
              className="absolute ml-4 mt-auto mb-auto left-0  top-[10%] h-[80%] w-[5%]"
              src={icon1 ? icon1 : icon}
              alt="Icon"
              width={width ? width : 30}
              height={height ? height : 30}
            />
          ))}

        {icon2 && (
          <Image
            className="absolute ml-4 mt-auto mb-auto  right-4 top-[10%] h-[80%] w-[5%] cursor-pointer"
            src={icon2}
            alt="Icon"
            width={width ? width : 30}
            height={height ? height : 30}
            onClick={action}
          />
        )}
      </div>
    </>
  );
};

export default InputField;
