import DataService from './dataService';
import {
  ChatsByCompanyReturnType,
  ChatsByNumberReturnType,
} from './chatbotService.d';

export default class ChatbotService extends DataService {
  sendchat = (data: any) => {
    return this.post('/create', data);
  };

  getChatsByCompany = (id: string): Promise<ChatsByCompanyReturnType> => {
    return this.get('/companychats/' + id);
  };

  loadChatsByCompany = async ({
    token,
  }: {
    token: string;
  }): Promise<ChatsByCompanyReturnType> => {
    const response = await this.get('/companychats/' + token);
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
