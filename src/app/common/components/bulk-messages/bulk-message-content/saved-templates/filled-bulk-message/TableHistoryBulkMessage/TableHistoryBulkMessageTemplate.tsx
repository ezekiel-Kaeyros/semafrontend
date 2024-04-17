'use client';
import importIcon from '../../../../../../../../../public/import.png';
import exportIcon from '../../../../../../../../../public/export.png';

import InformationIcon from '../../../../../../../../../public/icons/information.svg';

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
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';
// import TransactionConfirm from '@/app/common/components/transactionSending/transaction-confirm/TransactionConfirm';

import React from 'react';

import Link from 'next/link';
// import { Button } from '@/app/common/components/button/Button';

import { ButtonI } from '@/app/common/ui/button/Button';
import { ChevronDownIcon } from '@/app/common/ui/table/ChevronDownIcon';
import { capitalize } from '@/app/common/ui/table/utils/utils';
import { SearchIcon } from '@/app/common/ui/table/SearchIcon';

import ModaldetailBroadcast from './modalDetail/ModalDetail';

const columns = ['Template Name', 'date', 'action'];
type SessionTemplate = {
  id: string;
  template_name: string;
  template_id: string;
  company_name: string;
  phone_number_id: string;
  created_at: string;
};

const TableHistoryTemplete: React.FC<{ tableSession?: any; delete?: any }> = (
  props
) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const [idSession, setIdSession] = useState('');

  const [pageTable, setPageTable] = useState<number>(8);
  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);

  const text =
    ' All templates must adhere to WhatsApp’s Template Message Guidelines. Click here to read';
  const filteredItems = useMemo(() => {
    let filterTableTemple: SessionTemplate[];

    filterTableTemple = props.tableSession;

    if (hasSearchFilter && filterTableTemple?.length > 0) {
      filterTableTemple = filterTableTemple.filter((item: SessionTemplate) =>
        item
          ?.template_name!.toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase())
      );
    }

    return filterTableTemple;
  }, [filterValue, hasSearchFilter, props.tableSession]);

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
  const showHandler = () => {
    setIsShowModal((isShowModal) => !isShowModal);
    setIdSession('');
  };

  return (
    <div>
      {props.tableSession.length > 0 ? (
        <>
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
                    {sortedItems.map((row, index) => {
                      return (
                        <TableRow
                          key={index}
                          className="border-t-1  h-14 border-white py-2"
                        >
                          <TableCell className="text-left py-4">
                            {row.template_name}
                          </TableCell>
                          <TableCell className="text-left py-4">
                            {row.created_at.split('T')[0].split('-')[2] +
                              '-' +
                              row.created_at.split('T')[0].split('-')[1] +
                              '-' +
                              row.created_at.split('T')[0].split('-')[0] +
                              ' ' +
                              row.created_at.split('T')[1].split(':')[0] +
                              ':' +
                              row.created_at.split('T')[1].split(':')[1]}
                          </TableCell>
                          <TableCell className="relative flex  items-center gap-2">
                            {' '}
                            {/* <Image src={EditIcon} alt="Icon edit" /> */}
                            <Image
                              src={InformationIcon}
                              alt="Icon info"
                              onClick={() => {
                                setIdSession(row?.id);
                                setIsShowModal((isShowModal) => !isShowModal);
                              }}
                            />
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

      <ModaldetailBroadcast
        isShow={isShowModal}
        showHandler={showHandler}
        id={idSession}
      />
    </div>
  );
};
export default TableHistoryTemplete;
