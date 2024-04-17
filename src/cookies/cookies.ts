import cookies from 'js-cookie';
import { USER_DATA } from './cookies.d';

export const setUserCookies = (data: {token:string}) => {
  cookies.set(USER_DATA, JSON.stringify(data));
};

export const getUserCookies = () => {
  const data = cookies.get(USER_DATA);
  return data ? JSON.parse(data) : undefined;
};

export const removeUserCookies = () => {
  cookies.remove(USER_DATA);
};
