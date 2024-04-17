
import dataServiceBulkmessage from './dataServiceBulkmessage';

export default class BulkMessagesService extends dataServiceBulkmessage {
  sendBulkMessages = async (data: {
    template_name: string;
    recipients_phone_numbers: string[];
  }) => {
    try {
      const response = await this.post(
        'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/broadcast/100609346426084',
        data
      );
      alert('stop');

      return response.data;
    } catch (error) {
      alert('stop');
    }
    // console.log(response?.data, 'result');
  };

  sendBulkMessages2 = (data: {
    template_name: string;
    recipients_phone_numbers: string[];
  }): Promise<{ data: any; status: any }> => {
    return this.post('/broadcast/100609346426084', data);
  };

  deleteTemplete = (
    name_templete: string
  ): Promise<{
    data: {
      message: string;
      data: {
        success: boolean;
      };
    };
    status: any;
  }> => {
    return this.delete('/template/100609346426084/' + name_templete);
  };

  getTemplateByClient = async () => {
    const response = await this.get(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/template/100609346426084'
    );
    return response.data;
  };

  getTemplateSession = async () => {
    const response = await this.get(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/broadcast-session/100609346426084'
    );
    return response.data;
  };
  getDetailTemplateSession2 = (
    id: string
  ): Promise<{
    data: {
      message: string;
      data: {
        id?: string;
        template_name?: string;
        template_id?: string;
        company_name?: string;
        phone_number_id?: string;
        broadcasts: {
          id?: number;
          session_id?: number;
          phone?: string;
          template_id?: number;
          response_id?: string;
          status?: string;
          template_name?: string;
          message_status?: string;
          phone_number_id?: string;
          success?: boolean;
          created_at?: Date;
          
        }[];
      };
    };

    // data:any
    status: any;
  }> => {
    return this.get('/broadcast-session/100609346426084/' + id);
  };
  getDetailTemplateSession = async (id: string) => {
    const response = await this.get(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/broadcast-session/100609346426084/' +
        id
    );
    return response.data;
  };
}
