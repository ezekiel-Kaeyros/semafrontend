import { getUserCookies } from '@/cookies/cookies';
import DataService from '../dataService';
import {
  ChatsByCompanyReturnType,
  ChatsByNumberReturnType,
  ImageReturnType,
} from './chatbotService.d';
import axios from 'axios';
interface ClientNumber {
  numberId: number;
  email: string;
}

const BASE_URL: string | undefined = process.env.API_CHATBOT_URL;
// const clientPhonenumber: ClientNumber[] = [
//   {
//     numberId: 299462959914851,
//     email: 'ketourah@mail.com',
//   },
// ];

export class ChatbotService extends DataService {
  client: any;
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
  sendchat = async (data: {
    message: string;
    phone_number: string;
    phone_number_id: string;
  }): Promise<{ data: any; status: number }> => {
    //  ;
    const response = await this.post(
      'https://back.chatbot.sem-a.com/chats',
      data
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Failed to fetch data');
    }
  };

  getChatsByCompany = (id: string): Promise<ChatsByCompanyReturnType> => {
    return this.get('/companychats/' + id);
  };

  loadChatsByCompany = async (params: {
    token?: string;
  }): Promise<ChatsByCompanyReturnType> => {
    const phone_number_id = getUserCookies().phone_number_id;
    const response: ChatsByCompanyReturnType = await this.get(
      'https://back.chatbot.sem-a.com/companychats/' + phone_number_id
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Failed to fetch data');
    }
  };

  uploadImage = async (params: { file: File }): Promise<ImageReturnType> => {
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('phone_number_id', 'phoneNumberId');
    const response = await axios.post(
      'https://back.chatbot.sem-a.com/scenarios/upload-file',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch data');
    }
  };

  getConversationByNumber = (
    token: string,
    number: string
  ): Promise<ChatsByNumberReturnType> => {
    const reponse = this.get(`/chats/${token}/${number}`);
    return reponse.data;
  };
}
