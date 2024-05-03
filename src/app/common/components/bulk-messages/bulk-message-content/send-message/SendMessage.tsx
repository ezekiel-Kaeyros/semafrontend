
// import Scenario from '../../../chatbot/scenario/Scenario';
import React, { useEffect, useState } from 'react';
import folderImg from '../../../../../../../public/icons/note-text.svg';
import call from '../../../../../../../public/icons/call.svg';
import add from '../../../../../../../public/icons/add-circle.svg';
// import RessourcesAccordion from './Ressources-accordion/RessourcesAccordion';
// import ScenarioForm from './Scenario-form/ScenarioForm';
import Image from 'next/image';
import { Button } from '@/app/common/ui/button/Button';
import * as XLSX from 'xlsx';
import toast, { Toaster } from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
import {BulkMessagesService} from '@/services';
import { postBulkMessage } from './actionSendMessage';
import InputField from '@/app/common/ui/forms/text-field/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import Item from 'antd/es/list/Item';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { refesh } from '@/redux/features/bulk-message-slice';
import { Select, SelectItem } from '@nextui-org/react';
type bulkmessageDataType = {
  name: string;
  id: string;
  status: string;
};
type TableNumberFile = {
  number: string;
};
type TypeResponseBulkMsg = {
  message: string;
  data: any[];
  status?: number;
};
const SendMessage = () => {
  const { isRefresh, dispatch } = useBolkMessage();
  const clientQuery = useQueryClient();

  const { data: posts, error } = useQuery({
    queryKey: ['getTemplete'],
    queryFn: new BulkMessagesService().getTemplateByClient,
  });
  const [step, setStep] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [templeteValues, setTempleteValues] = useState({ id: '', name: '' });
  const [inputValue, setInputValue] = useState<FileList>();
  const [data, setData] = useState<string[]>([]);
  const [dataInput, setDataInput] = useState<string[]>([]);
  const [fileName, setFileName] = useState('');
  const sendBulkMessage = async (number: string[], name: string) => {
    const dataToSendForBulkmessage = {
      recipients_phone_numbers: number,
      template_name: name,
    };
    console.log('dataToSendForBulkmessage', dataToSendForBulkmessage);

    try {
      setIsLoading(true);
      const respon = await postBulkMessage(dataToSendForBulkmessage);
      console.log(respon, 'response');

      toast.success('message sent');
      setIsLoading(false);
      console.log(dataToSendForBulkmessage, 'datas sending');
      setDataInput([]);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleFileSelected = async (e: any) => {
    const ext = e.target?.files[0]?.name.split('.').pop();
    ext !== 'xlsx' ? toast.error('bad file') : '';
    // filee=e.target.files[0];
    const files = e?.target?.files;
    setFileName(e.target?.files[0].name);
    if (ext === 'xlsx') {
      files && setInputValue(files);

      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      setInputValue(e.target.files);
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData: any = XLSX.utils.sheet_to_json(sheet);
        if (parsedData.length > 0) {
          let tablenumber: string[] = [];
          parsedData.map((item: TableNumberFile) => {
            const dummyTableNumber = Object.values(item);
            tablenumber.push(dummyTableNumber[0]);
          });
          if (tablenumber.length > 0) {
            setData(tablenumber);
          }
        }
      };
      e.target.value = null;
    }
  };
  const getIdHandler = (e: any) => {
    const value = e.target.value;
    const tableValueTemplete = value.split('_');
    setTempleteValues({
      id: '',
      name: value,
    });
  };

  const deleNumber = (value: string) => {
    let dummyTableNumber = dataInput;
    const returnTable = dummyTableNumber.filter((Item) => Item != value);
    setDataInput(returnTable);
  };
  const addNumber = () => {
    let dummyTableNumber: string[] = dataInput;
    if (dummyTableNumber.length > 0) {
      const check = dummyTableNumber.filter((item) => item === numberToSend);
      if (check.length == 0) {
        dummyTableNumber.push(numberToSend);
        setDataInput(dummyTableNumber);
      }
    } else {
      dummyTableNumber.push(numberToSend);
      setDataInput(dummyTableNumber);
    }
  };
  // const sendBulkMessage = async (data: {
  //   recipients_phone_numbers: string[];
  //   template_name: string;
  // }) => {
  //   const dataToSendForBulkmessage = {
  //     recipients_phone_numbers: data,
  //     template_name: templeteValues.name,
  //   };
  //   const response = new BulkMessagesService().sendBulkMessages(
  //     data
  //   );
  // };

  // const {mutateAsync:sendBulkMessageMutation } = useMutation({
  //   mutationFn: sendBulkMessage,
  //   onSuccess(data, variables, context) {
  //     console.log(data,'datas');

  //   },
  // })
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, errors },
  } = useForm<{ numberToSend: string }>({
    mode: 'onChange' || 'onBlur' || 'onTouched',
  });
  let numberToSend = watch('numberToSend');
  const onSubmit: SubmitHandler<{ numberToSend: string }> = async (data) => {
    reset();
  };

  useEffect(() => {
    if (isRefresh) {
      clientQuery.invalidateQueries({ queryKey: ['getTemplete'] });
      dispatch(refesh(false));
    }
    if (dataInput.length < 5 && isAdd) {
      addNumber();
      setValue('numberToSend', '');
    }
    setIsAdd(false);
    if (dataInput.length == 5 || isLoading) {
      setValue('numberToSend', '');
    }
  }, [isAdd, dataInput, refesh, numberToSend, isLoading]);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center w-full items-center mb-5 mt-12">
        <Select
          // color="secondary"
          size='lg'
          label="select template"
          placeholder="select template"
          selectionMode="single"
          className="max-w-sm "
          onChange={(e: any) => {
            console.log(e,'------------------------------------------------------');
            
            if (e.target.value !== '') {
              getIdHandler(e);
            }
          }}
        >
          {/* {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))} */}

          {posts &&
            posts?.data?.data &&
            posts?.data?.data.map((item: bulkmessageDataType) => {
              if (item.status == 'APPROVED') {
                return (
                  <SelectItem
                    key={item.name}
                    value={item.name}
                    className="py-3 px-2"
                  >
                    {item.name}
                  </SelectItem>
                );
              }
            })}
        </Select>
        {/* <label htmlFor="">select template :</label>
        <select
          name=""
          id=""
          className="py-2 pl-3 pr-4 rounded-lg ml-1"
          onChange={(e: any) => {
            if (e.target.value !== '') {
              getIdHandler(e);
            }
          }}
        >
          <option value="">select template</option>
          {posts &&
            posts?.data?.data &&
            posts?.data?.data.map((item: bulkmessageDataType) => {
              if (item.status == 'APPROVED') {
                return (
                  <option key={item.id} value={item.name} className="py-3 px-2">
                    {item.name}
                  </option>
                );
              }
            })}
        </select> */}
      </div>
      <div className="w-fit m-auto flex bg-mainDarkLight rounded-full justify-between h-fit my-5">
        <div
          onClick={() => {
            if (step == 'file') {
              setStep('phone');
            }
          }}
          className={`h-full text-center px-5 py-3  text-xs ${
            step != 'file'
              ? 'bg-[blue] text-white rounded-full font-bolder'
              : 'bg-transparent text-white cursor-pointer '
          }`}
        >
          To number
        </div>
        <div
          onClick={() => {
            if (step != 'file') {
              setStep('file');
            }
          }}
          className={`h-full text-center px-5 py-3  text-xs ${
            step == 'file'
              ? 'bg-[blue] text-white rounded-full font-bolder'
              : 'bg-transparent text-white cursor-pointer'
          }`}
        >
          In bulk
        </div>
      </div>
      <div className="flex justify-center">
        <form
          className={`${
            step != 'file' ? '-translate-x-[200%] hidden' : 'translate-x-0'
          } duration-300 ease-linear  w-8/12 m-auto `}
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border border-[#212529] rounded-lg cursor-pointer bg-[#212529] dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-100 dark:hover:border-gray-100 dark:hover:bg-gray-500">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Image
                  src={folderImg}
                  alt="upload folder"
                  className="w-16 mb-4"
                />

                <>
                  {' '}
                  <h2 className="mb-2 text-white  font-semibold text-center">
                    Drag or Drop a single file to send your message
                  </h2>
                  <p className="text-white  text-center">{'( XLXS File )'}</p>
                </>
              </div>

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileSelected}
                accept=".xlsx"
                // ref={refInput}
              />
            </label>
          </div>
          {inputValue !== undefined && (
            <div className="grid grid-cols-1 mt-5 gap-3">
              {/* { filename && filename?.map(({ name }) => { */}
              {/* return ( */}
              <div className="border border-[lightgray] rounded-lg">
                <div className="flex justify-between px-3 py-4">
                  <div>
                    <h1>{fileName}</h1>
                  </div>
                  <div
                    onClick={() => {
                      setInputValue(undefined);
                    }}
                    className="flex items-center justify-center text-2xl cursor-pointer"
                  >
                    {/* <Image src={crossIcom} alt="cross Icon" className='cursor-pointer' onClick={handleRemoveFile}/> */}
                    x
                  </div>
                </div>
              </div>
              {/* ); */}
              {/* })} */}
            </div>
          )}
          <div className="mt-6">
            <Button
              className="w-auto m-auto px-8"
              disabled={
                isLoading ||
                !inputValue ||
                templeteValues.name == '' ||
                data.length < 1
                  ? true
                  : false
              }
              variant={
                isLoading ||
                !inputValue ||
                data.length < 1 ||
                templeteValues.name == ''
                  ? 'disabled'
                  : 'mainColor'
              }
              onClick={async () => {
                const dataToSendForBulkmessage = {
                  recipients_phone_numbers: data,
                  template_name: templeteValues.name,
                };
                //  try {
                //    await sendBulkMessageMutation(dataToSendForBulkmessage);
                //    console.log(
                //      dataToSendForBulkmessage.template_name,
                //      'template'
                //    );
                //    alert('none');
                //  } catch (error) {
                //   alert('none')
                //  }

                try {
                  setIsLoading(true);
                  const respon = await postBulkMessage(
                    dataToSendForBulkmessage
                  );
                  toast.success('message sent');
                  setIsLoading(false);
                  console.log(dataToSendForBulkmessage, 'datas sending');
                  setInputValue(undefined);
                } catch (error) {
                  setIsLoading(false);
                }
              }}
            >
              {isLoading ? 'transfering...' : 'send '}
            </Button>
          </div>
        </form>

        <form
          className={` ${
            step == 'file' ? '-translate-x-[200%] hidden' : 'translate-x-0'
          } duration-300 ease-linear m-auto w-8/12 text-center`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="mb-5">Enter your numbers (5 numbers max)</p>
          {dataInput && (
            <div className="w-6/12 m-auto grid grid-cols-3 gap-3 my-10 text-sm">
              {dataInput.map((Item, index) => (
                <div key={index} className="grid grid-cols-1 mt-5 gap-3">
                  {/* { filename && filename?.map(({ name }) => { */}
                  {/* return ( */}
                  <div className="border border-[lightgray] rounded-3xl">
                    <div className="flex justify-between items-center px-3 py-2 ">
                      <div>
                        <h1>{Item}</h1>
                      </div>
                      <div
                        onClick={() => {
                          deleNumber(Item);
                        }}
                        className="flex items-center justify-center text-xl cursor-pointer"
                      >
                        {/* <Image src={crossIcom} alt="cross Icon" className='cursor-pointer' onClick={handleRemoveFile}/> */}
                        x
                      </div>
                    </div>
                  </div>
                  {/* ); */}
                  {/* })} */}
                </div>
              ))}
            </div>
          )}
          <div className="w-6/12 m-auto">
            {' '}
            <InputField
              icon={call}
              icon2={
                numberToSend &&
                numberToSend.length > 0 &&
                dataInput.length < 5 &&
                add
              }
              name="templateName"
              // title="Enter your numbers  (5 numbers max)"
              register={register('numberToSend', {
                required: true,
                 pattern: /^[0-9]{1,18}$/,
              })}
              placeholder="Enter the phone number"
              style="rounded-lg px-12 pr-16 py-4 dark:bg-botMessageBg2 font-[serif] hidden"
              labelTextStyle="font-bold"
              classes={'font-[serif]'}
              action={() => {
                if (dataInput.length < 5) {
                  setIsAdd(true);
                }
              }}
            />
          </div>
          {errors.numberToSend && numberToSend && (
            <p className="my-3 text-red-500 text-xs">
              Number must be only the numbers with the length lesser than 19
            </p>
          )}
          <div className="mt-5  w-6/12 m-auto">
            <div>
              <Button
                className="w-full px-8"
                disabled={
                  isLoading || dataInput.length < 1 || templeteValues.name == ''
                    ? true
                    : false
                }
                variant={
                  isLoading || dataInput.length < 1 || templeteValues.name == ''
                    ? 'disabled'
                    : 'primary'
                }
                onClick={async () => {
                  sendBulkMessage(dataInput, templeteValues.name);
                }}
              >
                {isLoading ? 'transfering...' : 'Send'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
