'use client';

import React, { useMemo, useState } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { initialStatistiques } from '../../components/bulk-messages/startCart/dataStat';
import { CalendarOutlined } from '@ant-design/icons';
//import { CalendarOutlined } from './CalendarOutlined';
import moment from 'moment';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from '@nextui-org/react';

import Image from 'next/image';
import dayjs from 'dayjs';
import { SearchIcon } from './SearchIcon';
import { columns, users, statusOptions } from './utils/data';
import { capitalize } from './utils/utils';
import Card from '../card/Card';
import { ChevronDownIcon } from './ChevronDownIcon';
import EditIcon from '../../../../../public/icons/edit.svg';
import InformationIcon from '../../../../../public/icons/information.svg';
import DeleteIcon from '../../../../../public/icons/trash-animation.svg';

import importIcon from '../../../../../public/import.png';
import exportIcon from '../../../../../public/export.png';
import IconCalendar from '../../../../../public/icons/calendar.svg';
import { CircularProgress } from '@nextui-org/react';
import StatContent from '../../components/bulk-messages/startCart/StartCart';
import { dateTimeNow } from '@/utils/constants';
import Link from 'next/link';
import { ButtonI } from '../button/Button';
import ModalDelete from './modal-delete/ModalDelete';
import ModaldetailBroadcast from '../../components/bulk-messages/bulk-message-content/saved-templates/filled-bulk-message/TableHistoryBulkMessage/modalDetail/ModalDetail';

const statusColorMap: any = {
  completed: 'success',
  paused: 'danger',
  pending: 'warning',
};
const { RangePicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';
const INITIAL_VISIBLE_COLUMNS = [
  'name',
  'time',
  'recipients',
  'successful',
  'read',
  'failed',

  'actions',
];

const App: React.FC<{ tableSession: any[] }> = ({ tableSession }) => {
  const [filterValue, setFilterValue] = useState<string>('');
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));
  const [date, setDate] = useState<Date>(new Date());

  const [incrementalFiltering, setIncrementalFiltering] = useState(true);
  const [dateEnd, setDateEnd] = useState<any>();
  const [dateStart, setDateStart] = useState<any>();
  const [currentDateStart, setCurrentDateStart] = useState<any>();
  const [currentDateEnd, setCurrentDateEnd] = useState<any>();
  const [selectedtDateStart, setSelectedtDateStart] = useState<any>();
  const [identityData, setIdentityData] = useState<any>();
  const [isShowModal, setIsShowModal] = useState(false);

  const [idSession, setIdSession] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<any>('all');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = useState<any>({
    column: 'age',
    direction: 'ascending',
  });
  console.log('tableSession', tableSession);

  const [page, setPage] = useState<number>(1);

  // const pages = Math.ceil(users.length / rowsPerPage);

  // Filtering
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo<any>(() => {
    let filteredUsers = [...tableSession];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.template_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    // if (
    //   statusFilter !== 'all' &&
    //   Array.from(statusFilter).length !== statusOptions.length
    // ) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.status)
    //   );
    // }

    return filteredUsers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableSession, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const headerColumns = useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // On range picker change
  const onChangeDateStart: DatePickerProps['onChange'] = (
    date: any,
    dateString
  ) => {
    const currentDate = moment();
    const selectedDate = moment(date);

    setCurrentDateStart(currentDate);
    setSelectedtDateStart(selectedDate);
    setDateStart(date);
  };

  const onChangeDateEnd: DatePickerProps['onChange'] = (
    date: any,
    dateString
  ) => {
    const currentDate = moment(); // Current date
    const selectedDate = moment(date);
    setCurrentDateEnd(currentDate);
    setSelectedtDateStart(selectedDate);
    setDateEnd(date);
  };

  // HANDLE CSV EXPORT FUNCTIONALITY
  let objUrl = '/';
  if (tableSession.length > 0) {
    let final_value = [];
    if (incrementalFiltering === true) {
      final_value = tableSession;
    } else {
      final_value = tableSession;
    }

    const titleKeys = Object.keys(final_value[0]);
    // console.log("titleKeys: ", titleKeys)

    const refinedData = [];
    refinedData.push(titleKeys);

    users.forEach((item) => {
      refinedData.push(Object.values(item));
      // console.log("refinedData: ", refinedData)
    });

    let csvContent = '';

    refinedData.forEach((row) => {
      csvContent += row.join(',') + '\n';
      // console.log("refinedData: ", csvContent)
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
    // console.log("blob: ", blob)

    objUrl = URL.createObjectURL(blob);
    // console.log("objUrl: ", objUrl)
  }
  const showHandler = () => {
    setIsShowModal((isShowModal) => !isShowModal);
    setIdSession('');
  };
  const renderCell = React.useCallback(
    (user: any, columnKey: string | number) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case 'name':
          return (
            <div className="flex flex-row ">
              <p
                className="text-bold text-small capitalize font-normal cursor-pointer"
                onClick={() => {
                  console.log('user', user?.id);
                  setIdSession(user?.id);
                  setIsShowModal((isShowModal) => !isShowModal);
                }}
              >
                {user.template_name}
              </p>
            </div>
          );

        case 'time':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize font-normal">
                {user.created_at.split('T')[0].split('-')[2] +
                  '-' +
                  user.created_at.split('T')[0].split('-')[1] +
                  '-' +
                  user.created_at.split('T')[0].split('-')[0] +
                  ' ' +
                  user.created_at.split('T')[1].split(':')[0] +
                  ':' +
                  user.created_at.split('T')[1].split(':')[1]}
              </p>
            </div>
          );
        case 'recipients':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize font-normal">
                {user?.broadcasts && user?.broadcasts.length}
              </p>
            </div>
          );
        case 'successful':
          return (
            <div className="flex flex-row ">
              <CircularProgress
                size="lg"
                classNames={{
                  indicator: 'text-[green]',
                  // value: 'text-[green]',
                }}
                value={
                  user?.broadcasts.filter(
                    (item: any) =>
                      item.status == 'read' || item.status == 'delivered'
                  ).length
                }
                // color="success"
                showValueLabel={true}
                maxValue={user?.broadcasts && user?.broadcasts.length}
              />
            </div>
          );
        case 'read':
          return (
            <div className="flex flex-row ">
              <CircularProgress
                size="lg"
                classNames={{
                  indicator: 'text-[green]',
                  // value: 'text-[green]',
                }}
                value={
                  user?.broadcasts
                    ? user?.broadcasts.filter(
                        (item: any) => item.status == 'read'
                      ).length
                    : 0
                }
                // color="success"
                // formatOptions={{ style: "unit", unit: "kilometer" }}
                showValueLabel={true}
                maxValue={user?.broadcasts && user?.broadcasts.length}
              />
            </div>
          );
        case 'failed':
          return (
            <div className="flex flex-row ">
              <CircularProgress
             
                size="lg"
                value={
                  user?.broadcasts
                    ? user?.broadcasts.filter(
                        (item: any) => item.status == 'failed'
                      ).length
                    : 0
                }
                color="success"
                //  formatOptions={{ style: "unit", unit: "kilometer" }}
                showValueLabel={true}
                maxValue={user?.broadcasts && user?.broadcasts.length}
              />
            </div>
          );

        case 'actions':
          return (
            <div className="relative flex  items-center gap-2">
              {/* <Image src={EditIcon} alt="Icon edit" /> */}
              {/* <Image
                src={InformationIcon}
                alt="Icon info"
                onClick={() => {
                  console.log('user', user?.id);
                  setIdSession(user?.id);
                  setIsShowModal((isShowModal) => !isShowModal);
                }}
              /> */}
              {/* <Image src={DeleteIcon} alt="Icon delete" /> */}
              <ModalDelete />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="flex flex-col">
          Sorted By
          <div className="flex justify-between gap-3 items-end">
            <div className="2xl:w-[55%] w-[65%] flex flex-row gap-3 h-10">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex w-full focus:bg-[#2B2E31] dark:bg-[#2B2E31] sm:max-w-[30%] justify-between h-full ">
                  <Button
                    className="text-sm font-thin text-[#CFD4D8]"
                    endContent={
                      <ChevronDownIcon className="text-sm font-thin" />
                    }
                  >
                    latest...
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Input
                isClearable
                classNames={{
                  base: 'w-full focus:bg-[#2B2E31] sm:max-w-[30%] text-sm h-full',
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
              <Space>
                <div className="h-full flex gap-1">
                  <Image src={IconCalendar} alt="icon calendar" />
                  <span className="flex flex-col">
                    <span className="text-[14px] p-0 font-light text-[#CFD4D8]">
                      From date
                    </span>
                    <DatePicker
                      suffixIcon=""
                      className="text-white p-0 text-[14px] bg-transparent border-0 hover:text-white hover:bg-transparent hover:border-0"
                      defaultValue={dayjs(dateStart)}
                      onChange={onChangeDateStart}
                      format={dateFormat}
                    />
                  </span>
                </div>

                <div className="h-full flex gap-1">
                  <Image src={IconCalendar} alt="icon calendar" />
                  <span className="flex flex-col">
                    <span className="text-[14px] p-0 font-light text-[#CFD4D8]">
                      To date
                    </span>
                    <DatePicker
                      suffixIcon=""
                      disabledDate={(current) => {
                        // Your logic to disable specific dates
                        return (
                          current && (current < dateStart || current > dateEnd)
                        );
                      }}
                      className="text-white p-0 text-[14px] bg-transparent border-0 hover:text-white hover:bg-transparent hover:border-0"
                      defaultValue={dayjs(dateEnd)}
                      onChange={onChangeDateEnd}
                      format={dateFormat}
                    />
                  </span>
                </div>
              </Space>
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
                <Link href={objUrl}>
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
          {/*  <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {users.length} users
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div> */}
        </div>

        <div className="flex flex-col gap-4">
          <StatContent initialStatistiques={initialStatistiques} />
        </div>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          // isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        {/* <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${items.length} selected`}
        </span> */}
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  console.log(dateStart);
  console.log('test ####################################');
  console.log(dateEnd);
  // Fonction de filtrage des données en fonction de l'intervalle de temps
  const filtrerIntervalleTemps = () => {
    if (dateStart && dateEnd) {
      // let tableauDonnees = users.map((items)=> {items.time})
      const tableauFiltre = users.filter((item) => {
        return item.time >= dateStart && item.time <= dateEnd;
      });
      // Utilisez le nouveau tableau filtré comme vous le souhaitez
      console.log(tableauFiltre);
    }
  };
  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'px-0 max-h-[382px] dark:bg-[#2B2E31] mt-5',
          th: [
            'dark:bg-transparent',
            'text-white',
            'font-normal',
            'w-1/8 ',
          ],
          td: [
            'px-3  border-t border-divider text-default-700',
            'dark:bg-[#2B2E31]',
            'w-1/8 ',
          ],
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'center'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No users found'} items={sortedItems}>
          {(item) => (
            <TableRow
              key={item.id}
              className=""
              onClick={() => {
                console.log('item', item);
              }}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModaldetailBroadcast
        isShow={isShowModal}
        showHandler={showHandler}
        id={idSession}
      />
    </>
  );
};

export default App
