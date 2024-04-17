/* eslint-disable no-unused-vars */
export type StatusFitlerProps = {
  options: Array<{
    id: number;
    status: string;
    numberOfChats: string;
    color: string;
  }>;
  handleSelect?: (id: string | number) => void;
};

export const options = [
  {
    id: 1,
    status: 'opened',
    numberOfChats: '4',
    color: '#182881',
  },
  {
    id: 2,
    status: 'pending',
    numberOfChats: '2',
    color: '#915103',
  },
  {
    id: 3,
    status: 'closed',
    numberOfChats: '10',
    color: '#157A3F',
  },
  {
    id: 4,
    status: 'expired',
    numberOfChats: '5',
    color: '#B00020',
  },
];
