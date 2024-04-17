import Image from 'next/image';
import React from 'react';

type InputFieldProps = {
  register?: any;
  icon?: any;
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
};

const InputField: React.FC<InputFieldProps> = ({
  register,
  title,
  name,
  icon,
  placeholder,
  type,
  classes,
  width,
  height,
  reference,
  style,
}) => {
  return (
    <div className={`relative w-full ${classes}`}>
      {title && (
        <label
          className={` font-bold block mb-3 text-gray-700 dark:text-white`}
          htmlFor={name}
        >
          {title}
        </label>
      )}
      <input
        className={`appearance-none dark:bg-mainDarkLight focus:dark:outline-primary dark:text-white focus:dark:bg-mainDarkLight border border-slate-700 relative w-full leading-tight bg-transparent  rounded-xl py-4 ${icon ? 'px-12 pr-16' : 'px-6'}  focus:border-primary' focus:outline-none`}
        id={name}
        type={type ? type : 'text'}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus
        ref={(el) => {
          reference.current = el;
        }}
        style={{
          fontFamily: 'visby-regular',
        }}
        {...register}
      />
      {icon && (
        <Image
          className="absolute ml-4 mt-auto mb-auto left-0 right-0 top-0 bottom-0"
          src={icon}
          alt="Icon"
          width={width ? width : 30}
          height={height ? height : 30}
        />
      )}
    </div>
  );
};

export default InputField;
