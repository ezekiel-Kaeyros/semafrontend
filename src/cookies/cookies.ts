import cookies from 'js-cookie';
import { USER_DATA } from './cookies.d';

export const setUserCookies = (data: { token: string }) => {
  cookies.set(USER_DATA, JSON.stringify(data));
};

export const getUserCookies = () => {
  const data = cookies.get(USER_DATA);
  return data ? JSON.parse(data) : undefined;
};

export const removeUserCookies = () => {
  cookies.remove(USER_DATA);
};

export const getModalStateCookie = () => {
  const stateCookie = cookies.get('modalStateCookie');
  return stateCookie ? JSON.parse(stateCookie) : false;
};

// Function to set the state in cookies
export const setModalStateInCookie = (state: any) => {
  cookies.set('modalStateCookie', JSON.stringify(state), {
    expires: 7,
    path: '/',
  });
};
