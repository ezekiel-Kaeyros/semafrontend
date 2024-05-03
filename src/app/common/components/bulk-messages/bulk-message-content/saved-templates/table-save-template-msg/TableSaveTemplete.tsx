'use client';
import importIcon from '../../../../../../../../public/import.png';
import exportIcon from '../../../../../../../../public/export.png';
import EditIcon from '../../../../../../../../public/icons/edit.svg';
import InformationIcon from '../../../../../../../../public/icons/information.svg';
import DeleteIcon from '../../../../../../../../public/icons/trash-animation.svg';
import Image from 'next/image';


import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,

  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Pagination,
  Modal, ModalBody, ModalContent
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';
// import TransactionConfirm from '@/app/common/components/transactionSending/transaction-confirm/TransactionConfirm';

import React from 'react';

import Link from 'next/link';
// import { Button } from '@/app/common/components/button/Button';
import { toast, Toaster } from 'react-hot-toast';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { TypeItemTableSaveTemplete } from '@/redux/features/types';
import { ButtonI } from '@/app/common/ui/button/Button';
import { ChevronDownIcon } from '@/app/common/ui/table/ChevronDownIcon';
import { capitalize } from '@/app/common/ui/table/utils/utils';
import { SearchIcon } from '@/app/common/ui/table/SearchIcon';

import { deleteTemplete } from './actionDeleteTemplete';


const columns = ['Template Name', 'Category', 'Status', 'Language', 'action'];

const TableSaveTemplete: React.FC<{ data?: any; delete?: any }> = (props) => {
  const [isShow, setIsShow] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false);
  const [nameTemplateState, setNameTemplateState] = useState('');
  const { TableTemplete } = useBolkMessage();

  const [pageTable, setPageTable] = useState<number>(8);
  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);
console.log(props.data,'------------------------------');

  const text =
    ' All templates must adhere to WhatsApp’s Template Message Guidelines. Click here to read';
  const filteredItems = useMemo(() => {
    let filterTableTemple: TypeItemTableSaveTemplete[];

    filterTableTemple = props.data;

    if (hasSearchFilter && filterTableTemple?.length > 0) {
      filterTableTemple = filterTableTemple.filter(
        (item: TypeItemTableSaveTemplete) =>
          item
            ?.name!.toLocaleLowerCase()
            .includes(filterValue.toLocaleLowerCase()) ||
          item
            ?.status!.toLocaleLowerCase()
            .includes(filterValue.toLocaleLowerCase())
      );
    }

    return filterTableTemple;
  }, [filterValue, hasSearchFilter, props.data]);

  const [page, setPage] = useState(1);
  const pages = Math.ceil(filteredItems.length / pageTable);

  const items = useMemo(() => {
    const start1 = (page - 1) * pageTable;
    const end1 = start1 + pageTable;

    return filteredItems.slice(start1, end1);
  }, [page, filteredItems, pageTable]);

  // function of sort table
  const [sortDescriptor, setSortDescriptor] = useState<any>({
    column: 'number',
    direction: 'ascending',
  });

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a;
      const second = b;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // function of get value of input search
  const onSearchChange = useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  // const sendDatasHandler = () => {
  //   console.log(dataSending);
  //   try {
  //     const transfert = new TransfetService().sendFile(dataSending);
  //     if (transfert?.status === 200) {
  //       const result: Result = transfert.datas;
  //     }
  //   } catch (error) {
  //     console.log(`server error occured`, error);
  //   }

  //   setShowModalTransfer((showModalTransfer) => !showModalTransfer);
  // };

  return (
    <div>
      {props.data.length > 0 ? (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="w-full">
            Sorted By
            <div className="flex w-full justify-between ">
              <div className="flex gap-5">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex focus:dark:bg-cardDark w-auto justify-between h-full">
                    <Button
                      className=""
                      endContent={<ChevronDownIcon className="text-sm " />}
                      variant="flat"
                    >
                      latest...
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    // selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    // onSelectionChange={setVisibleColumns}
                  >
                    {columns.map((column, index) => (
                      <DropdownItem key={index} className="capitalize">
                        {capitalize(column)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Input
                  isClearable
                  classNames={{
                    base: 'w-auto focus:bg-[#2B2E31]  text-sm h-full',
                    inputWrapper: 'border-0 py-0 bg-[#2B2E31] text-sm h-full',
                  }}
                  startContent={<SearchIcon />}
                  placeholder="Search"
                  size="sm"
                  value={filterValue}
                  variant="bordered"
                  onClear={() => setFilterValue('')}
                  onValueChange={onSearchChange}
                />
              </div>
              <div className="flex gap-3 ">
                <div className="">
                  <ButtonI
                    variant={'bgDark'}
                    icon={importIcon}
                    // rightIcon={ true }
                    leftIcon={true}
                    iconSize={20}

                    // className='text-[12px] h-[50px]'
                  >
                    Import
                  </ButtonI>
                </div>
                <div className="">
                  <Link href={'#'}>
                    <ButtonI
                      variant={'bgDark'}
                      icon={exportIcon}
                      // rightIcon={ true }
                      leftIcon={true}
                      iconSize={20}
                      // className='text-[12px] h-[50px]'
                    >
                      Export
                    </ButtonI>
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-[#F18805] px-2 py-2 rounded-lg my-6 bg-white w-fit">
              {text}
            </div>
            {/* tables of details of users actions */}
            <div className="mt-6">
              <div className="  ">
                <Table
                  aria-label="Users table"
                  bottomContent={
                    <div className="md:flex block md:m-0 m-auto w-auto md:w-full justify-between">
                      <div className="flex text-black md:mb-0 mb-3 ">
                        <label className="mr-2 mt-2 font-[VisbyCF-light]">
                          show :{' '}
                        </label>
                        <select
                          name=""
                          id=""
                          onChange={(e: any) => {
                            setPageTable(e.target.value);
                          }}
                          className="rounded-xl font-[VisbyCF-light] pr-0 text-sm border"
                        >
                          <option key={pageTable}>{pageTable}</option>
                          {/* {selectOption.map((items) => {
                            if (items !== pageTable) {
                              return <option key={items}>{items}</option>;
                            }
                          })} */}
                        </select>
                      </div>

                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                        className="sm:w-auto "
                        classNames={{
                          cursor: 'bg-[red]',
                        }}
                      />
                    </div>
                  }
                  bottomContentPlacement="outside"
                  sortDescriptor={sortDescriptor}
                  onSortChange={setSortDescriptor}
                  classNames={{
                    wrapper: ' bg-[#2B2E31] px-0 py-0 ',
                    thead: 'bg-[#2B2E31] text-red-800 rounded-none ',
                  }}
                >
                  <TableHeader
                    columns={columns}
                    className="bg-transparent   text-red-800 hidden"
                  >
                    {columns.map((row, index) => {
                      return (
                        <TableColumn
                          className="text-left h-14 bg-[#2B2E31] text-[#CFD4D8] font-semibold"
                          key={index}
                        >
                          {row}
                        </TableColumn>
                      );
                    })}
                  </TableHeader>
                  <TableBody items={sortedItems}>
                    {sortedItems.reverse().map((row, index) => {
                      return (
                        <TableRow
                          key={index}
                          className="border-t-1  h-14 border-white py-2"
                        >
                          <TableCell className="text-left py-4">
                            {row.name}
                          </TableCell>
                          <TableCell className="font-[700] text-left py-4">
                            {row?.categorytemplete}
                          </TableCell>
                          <TableCell className="text-left py-4">
                            <span
                              className={` py-2 rounded-full text-xs font-bold  bg-white ${
                                row.status === 'APPROVED' &&
                                'bg-respon text-[#04773B] px-3 py-3'
                              }
                        ${
                          row.status === 'Pending' &&
                          'bg-notificationYellow text-[#D1AC00] px-3 py-3'
                        }
                        ${
                          row.status === 'REJECTED' &&
                          'bg-red-200 text-[#DA0303] px-3 py-3'
                        }
                        `}
                            >
                              {row.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-left py-4">
                            {row?.languageTemplete}
                          </TableCell>
                          <TableCell className="relative flex  items-center gap-2">
                            {' '}
                            <Image src={EditIcon} alt="Icon edit" />
                            <Image src={InformationIcon} alt="Icon info" />
                            <Image
                              src={DeleteIcon}
                              className='cursor-pointer'
                              alt="Icon delete"
                              onClick={async () => {
                                if (
                                  row.name?.toLocaleLowerCase() !==
                                  'hello_world'
                                ) {
                                  setNameTemplateState(row.name!);
                                  setIsShow((isShow) => !isShow);
                                }
                              }}
                            />{' '}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      <Modal
        isOpen={isShow}
        onOpenChange={() => {
          setIsShow((isShow) => !isShow);
        }}
        className=" bg-white sm:px-4 px-0 sm:z-10 z-[5000]"
        radius="lg"
        placement="center"
        closeButton={false}
        classNames={{
          // body: "py-6",
          // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          // header: "border-b-[1px] border-[#292f46]",
          // footer: "border-t-[1px] border-[#292f46]",
          closeButton: 'hidden',
        }}
      >
        <ModalContent>
          <>
            <ModalBody className="text-black pb-0 mb-0">
              <div className="w-full h-full bg-white flex items-center py-10">
                {!isConfirm ? (
                  <div>
                    <p className="text-sm">
                      are you sure you want to delete the templete{' '}
                      <strong> {nameTemplateState}</strong> ?
                    </p>
                    <div className="flex mt-10 justify-end">
                      <div className="mr-2">
                        <Button
                          className="w-auto bg-transparent border border-red-600 text-red-500"
                          onClick={() => {
                            setIsShow((isShow) => !isShow);
                          }}
                        >
                          cancel
                        </Button>
                      </div>
                      <div>
                        <Button
                          className="w-auto bg-black text-white"
                          onClick={async () => {
                            setIsConfirm((isConfirm) => !isConfirm);
                            try {
                              const responseDelete =
                                await deleteTemplete(nameTemplateState);

                              console.log(responseDelete, 'response delete');

                              props.delete();
                              setIsShow((isShow) => !isShow);
                              setNameTemplateState('');
                              setIsConfirm((isConfirm) => !isConfirm);
                              setTimeout(() => {
                                toast.success('opération succeeded');
                              }, 1000);
                            } catch (error) {
                              toast.error('delete fail');
                            }
                          }}
                        >
                          delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p>deleting.......</p>
                  </>
                )}
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default TableSaveTemplete;
