import DataService from '../dataService';
import { GetSenario, ScenarioInput } from './senarioService.d';
import axios, { AxiosInstance } from 'axios';
interface ClientNumber {
  numberId: number;
  email: string;
}

const BASE_URL = 'https://back.chatbot.sem-a.com';
// string | undefined = process.env.API_CHATBOT_URL;
const clientPhonenumber: ClientNumber[] = [
  {
    numberId: 299462959914851,
    email: 'ketourah@mail.com',
  },
];

export class SenarioService extends DataService {
  client: AxiosInstance;
  constructor() {
    super();
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
      headers: {
        'content-type': 'application/json',
      },
    });
  }
  create = async (
    data: ScenarioInput
  ): Promise<{ data: any; status: number }> => {
    try {
      const response = await this.client.post(BASE_URL + '/create', data);
      if (response.status === 200) {
        return response.data;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
  // TODO: FIX A TOKEN FOR PHONE NUMBER
  getAllSenarioOfPhoneId = async (params: {
    token?: string;
    email: string;
  }): Promise<{ data: GetSenario[]; status: number }> => {
    try {
      const response = await this.client.get(
        BASE_URL + '/scenarios/' + '100609346426084'
        // (clientPhonenumber.find((item) => item.email === params.email)
        //   ?.numberId
        //   ? clientPhonenumber.find((item) => item.email === params.email)
        //       ?.numberId
        //   : '100609346426084')
      );
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
  delete = async (
    id: string
  ): Promise<{ data: GetSenario[]; status: number }> => {
    try {
      const response = await this.client.delete(BASE_URL + '/delete/' + id);
      if (response.status === 204) {
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
  getSenarioById = async (
    id: string | undefined
  ): Promise<{ data: GetSenario; status: number }> => {
    try {
      const response = await this.client.get(BASE_URL + '/getone/' + id);
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
  // /edit/65fd662053521da88340a726
  edit = async (params: {
    token?: string;
    email: string;
    data: any;
    id: string;
  }): Promise<{ data: GetSenario[]; status: number }> => {
    try {
      const response = await this.client.put(
        BASE_URL + '/edit/' + params.id,
        params.data
        // (clientPhonenumber.find((item) => item.email === params.email)
        //   ?.numberId
        //   ? clientPhonenumber.find((item) => item.email === params.email)
        //       ?.numberId
        //   : '100609346426084')
      );
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
}
