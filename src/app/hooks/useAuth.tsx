import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const user: any = useSelector(
    (state: RootState) => state?.AuthReducer.userAuth
  );

  const dispatch = useDispatch<AppDispatch>();

  return {
    user,
    dispatch,
  };
};
