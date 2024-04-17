import { ReturnLoyaltyPropsType } from './loyalty-program.d';
import DataService from './dataService';

export default class LoyaltyProgramService extends DataService {
  createLoyaltyProgram = (data: any): Promise<ReturnLoyaltyPropsType> => {
    return this.post('/', data);
  };
}
