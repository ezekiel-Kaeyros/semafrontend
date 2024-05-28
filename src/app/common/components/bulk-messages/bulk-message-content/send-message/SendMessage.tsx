// import Scenario from '../../../chatbot/scenario/Scenario';
import React, { useEffect, useState } from 'react';
import folderImg from '../../../../../../../public/icons/note-text.svg';
import call from '../../../../../../../public/icons/call.svg';
import add from '../../../../../../../public/icons/add-circle.svg';
import search from '../../../../../../../public/icons/search-filter.svg';
// import RessourcesAccordion from './Ressources-accordion/RessourcesAccordion';
// import ScenarioForm from './Scenario-form/ScenarioForm';
import Image from 'next/image';
import { Button } from '@/app/common/ui/button/Button';
import * as XLSX from 'xlsx';
import toast, { Toaster } from 'react-hot-toast';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BulkMessagesService } from '@/services';
import { postBulkMessage } from './actionSendMessage';
import InputField from '@/app/common/ui/forms/text-field/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { refesh } from '@/redux/features/bulk-message-slice';
import { Select, SelectItem } from '@nextui-org/react';
import { countries } from './Country/dataCounties';

type bulkmessageDataType = {
  name: string;
  id: string;
  status: string;
};
type TableNumberFile = {
  number: string;
};

const SendMessage = () => {
  const { isRefresh, dispatch } = useBolkMessage();
  const clientQuery = useQueryClient();

  const { data: posts } = useQuery({
    queryKey: ['getTemplete'],
    queryFn: new BulkMessagesService().getTemplateByClient,
  });
  // ;

  const [step, setStep] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [c] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [countriess,setcountriess]=useState(countries)
  const [templeteValues, setTempleteValues] = useState({ id: '', name: '' });
  const [inputValue, setInputValue] = useState<FileList>();
  const [data, setData] = useState<string[]>([]);
  const [dataInput, setDataInput] = useState<string[]>([]);
  const [fileName, setFileName] = useState('');
  const [regex, setRegex] = useState<RegExp>(countries[0].check!);
  const [regexerror, setRegexerror] = useState(countries[0].errorTex);
  const [country, setCountry] = useState({
    icon: countries[0].icon,
    name: countries[0].abbrev,
    code:countries[0].code
  });
  const sendBulkMessage = async (number: string[], name: string) => {
    const dataToSendForBulkmessage = {
      recipients_phone_numbers: number,
      template_name: name,
    };
    // ;

    try {
      setIsLoading(true);
      const respon = await postBulkMessage(dataToSendForBulkmessage);
      // ;

      toast.success('message sent');
      setIsLoading(false);
      // ;
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
          if (tablenumber.length > 0 && tablenumber.length<=1000) {
            setData(tablenumber);
            
            

          } else {
            toast.error(
              'ce fichier est peut-être vide ou contient plus de 1000 numéros'
            );
            
          }
        }
      };
      e.target.value = null;
    }
  };
  const getIdHandler = (e: any) => {
    const value = e.target.value;
   
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
        dummyTableNumber.push(country.code + numberToSend);
        setDataInput(dummyTableNumber);
      }
    } else {
      dummyTableNumber.push( country.code+numberToSend);
      setDataInput(dummyTableNumber);
    }
  };

  const {
    setValue,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<{ numberToSend: string; findCountry: string }>({
    mode: 'onChange' || 'onBlur' || 'onTouched',
  });
  let numberToSend = watch('numberToSend');
  let findCountry = watch('findCountry');
  const onSubmit: SubmitHandler<{ numberToSend: string,findCountry:string }> = async (data) => {
    reset();
  };
  const changeCountyHandler = (item: any) => {
    setShowCountries(false);
    setRegex(item.check!);
    setRegexerror(item.errorTex!);
    // getIdHandler(e);
    setValue('numberToSend', '');
    setCountry({
      icon: item.icon,
      name: item.abbrev,
      code: item.code.replaceAll('+', ''),
    });
  }
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

    if (findCountry) {
      const val = countries.filter(
        (item) =>
          item.country
            .toLocaleLowerCase()
            .includes(findCountry.toLocaleLowerCase()) ||
          item.abbrev
            .toLocaleLowerCase()
            .includes(findCountry.toLocaleLowerCase())
      );
      setcountriess(val)
    } else {
      setcountriess(countries)
    }

  }, [isAdd, dataInput, refesh, numberToSend, isLoading,findCountry]);
  return (
    <div
      // onClick={}
      onDoubleClick={() => showCountries && setShowCountries(false)}
      className="h-full "
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center w-full items-center mb-5 mt-12">
        <Select
          // color="secondary"
          size="lg"
          label="select template"
          placeholder="select template"
          selectionMode="single"
          className="max-w-sm "
          classNames={{
            trigger: 'border text-white',
            value: 'text-white',
            label: 'text-white ',
          }}
          onChange={(e: any) => {
            // ;

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

          {/* {countries.map((item) => {
            return (
              <SelectItem
                key={item.code}
                value={item.country}
                // key={item.country}
              >
                <span className="flex items-center">
                  <Image src={item.icon} width={12} height={12} alt="" />
                  <span className="ml-2">{item.country}</span>
                </span>
              </SelectItem>
            );
          })} */}

          {posts &&
            posts?.data &&
            posts?.data.map((item: bulkmessageDataType) => {
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
          } duration-300 ease-linear  sm:w-8/12 w-11/12 m-auto `}
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
          {inputValue !== undefined && data.length > 0 && (
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
                sendBulkMessage(data, templeteValues.name);

                // const dataToSendForBulkmessage = {
                //   recipients_phone_numbers: data,
                //   template_name: templeteValues.name,
                // };
                // //  try {
                // //    await sendBulkMessageMutation(dataToSendForBulkmessage);
                // //    //console.log(
                // //      dataToSendForBulkmessage.template_name,
                // //      'template'
                // //    );
                // //    alert('none');
                // //  } catch (error) {
                // //   alert('none')
                // //  }

                // try {
                //   setIsLoading(true);
                //   const respon = await postBulkMessage(
                //     dataToSendForBulkmessage
                //   );
                //   toast.success('message sent');
                //   setIsLoading(false);
                //   // ;
                //   setInputValue(undefined);
                // } catch (error) {
                //   setIsLoading(false);
                // }
              }}
            >
              {isLoading ? 'transfering...' : 'send '}
            </Button>
          </div>
        </form>

        <form
          className={` ${
            step == 'file' ? '-translate-x-[200%] hidden' : 'translate-x-0'
          } duration-300 ease-linear m-auto sm:w-8/12 w-[95%] text-center`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="mb-5">Enter your numbers (5 numbers max)</p>
          {dataInput && (
            <div className="md:w-6/12 w-11/12 m-auto grid md:grid-cols-3 grid-cols-2 sm:gap-3 gap-1 my-10 text-sm">
              {dataInput.map((Item, index) => (
                <div key={index} className="grid grid-cols-1 mt-5 gap-3 w-full">
                  {/* { filename && filename?.map(({ name }) => { */}
                  {/* return ( */}
                  <div className="border border-[lightgray] rounded-3xl w-full">
                    <div className="flex justify-between items-center px-3 py-2 ">
                      <div>
                        <h1>{Item}</h1>
                      </div>
                      <div
                        onClick={() => {
                          deleNumber(Item);
                        }}
                        className="flex items-center justify-center md:text-xl cursor-pointer"
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

          <div className="lg:w-7/12 md:w-10/12 w-full m-auto flex items-center justify-between">
            {' '}
            <div className="relative lg:w-2/12 w-3/12 border h-14 rounded-xl flex items-center cursor-pointer">
              {country.icon.length > 0 && (
                <div
                  className="flex items-center justify-around w-full px-1"
                  onClick={() => setShowCountries((state) => !state)}
                >
                  <Image
                    src={country.icon}
                    width={20}
                    height={20}
                    alt=""
                    className="lg:h-5 lg:w-6 md:h-4 md:w-4 h-3 w-3"
                  />
                  <span className="md:ml-2 lg:text-base text-xs sm:block hidden">
                    {country.name}
                  </span>
                  <span className="md:ml-2 lg:text-base text-xs">
                    {country.code}
                  </span>
                </div>
              )}

              <div
                className={`w-[250%] absolute top-16 h-72   shadow-md bg-black rounded-lg z-[80]  ${showCountries ? 'block' : 'hidden'}`}
              >
                <div className="flex flex-col justify-between w-full h-full">
                  <div className="h-14  w-full" onClick={() => {}}>
                    <InputField
                      register={register('findCountry', {
                        required: true,
                        pattern: regex,
                      })}
                      icon2={search}
                    />
                  </div>
                  <div className="w-full min-h-32 h-[220px]  overflow-auto  no-scrollbar pt-[2px]">
                    {countriess.map((item, index) => {
                      return (
                        <p
                          key={index}
                          onClick={() => {
                            changeCountyHandler(item);
                          }}
                          className="cursor-pointer w-full mb-1 pl-2 "
                        >
                          <span className="flex items-center w-full">
                            <Image
                              src={item.icon}
                              width={14}
                              height={14}
                              alt=""
                            />
                            <span className="ml-3 lg:text-sm text- xs">
                              {item.country}
                            </span>
                          </span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[82%] w-[73%]">
              <InputField
                icon={call}
                icon2={
                  regex &&
                  numberToSend &&
                  numberToSend.length > 0 &&
                  !errors.numberToSend &&
                  dataInput.length < 5 &&
                  add
                }
                name="templateName"
                register={register('numberToSend', {
                  required: true,
                  pattern: regex,
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
          </div>
          {errors.numberToSend && numberToSend && (
            <p className="my-3 text-red-500 text-xs">{regexerror}</p>
          )}
          <div className="mt-5  lg:w-7/12 md:w-10/12 w-full m-auto">
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
