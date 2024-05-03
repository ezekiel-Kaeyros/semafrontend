/* eslint-disable no-unused-vars */
export type ChatItemProps = {
  id: string | number;
  picture?: string;
  number: string;
  status: 'pending' | 'expired' | 'closed' | 'open';
  message?: string;
  date?: string | undefined;
  handleSelected: (item: any) => void;
  color?: string;
};
