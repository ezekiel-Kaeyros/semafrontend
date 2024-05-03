/* eslint-disable no-unused-vars */
export type StatusFitlerProps = {
  options: Array<{
    id: number;
    status: string;
    numberOfChats: string;
    color: string;
  }>;
  handleSelect?: (id: string | number) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
};

export const options = [
  {
    id: 0,
    status: 'All',
    numberOfChats: '',
    color: '',
  },
  {
    id: 1,
    status: 'New',
    numberOfChats: '4',
    color: '#182881',
  },
  {
    id: 2,
    status: 'Pending',
    numberOfChats: '2',
    color: '#915103',
  },
  {
    id: 3,
    status: 'Expired',
    numberOfChats: '5',
    color: '#B00020',
  },
  {
    id: 4,
    status: 'Solved',
    numberOfChats: '10',
    color: '#157A3F',
  },
];
