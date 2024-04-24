
import { getUserCookies } from '@/cookies/cookies';
import {dataServiceBulkmessage} from '../dataServiceBulkMessage';

interface ClientNumber{
  numberId:number;
  email: string
}
const clientPhonenumber:ClientNumber[]= [
{
  numberId:299462959914851,
  email:"ketourah@mail.com"
}
]
export  class BulkMessagesService extends dataServiceBulkmessage {
  sendBulkMessages = async (data: {
    template_name: string;
    recipients_phone_numbers: string[];
  }) => {
    try {
      const hisEmail=getUserCookies().email;
      const response = await this.post(
        'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/broadcast/'+( clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId? clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId:"100609346426084"),
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
    const hisEmail=getUserCookies().email;
    return this.post('/broadcast/'+( clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId? clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId:"100609346426084"), data);
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
    const hisEmail=getUserCookies().email;
    return this.delete('/template/'+( clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId? clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId:"100609346426084")+"/" + name_templete);
  };

  getTemplateByClient = async () => {
    const hisEmail=getUserCookies().email;
    const response = await this.get(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/template/'+( clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId? clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId:"100609346426084")
    );
    return response.data;
  };

  getTemplateSession = async () => {
    const hisEmail=getUserCookies().email;
    const response = await this.get(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/broadcast-session/'+( clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId? clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId:"100609346426084")
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
    const hisEmail=getUserCookies().email;
    return this.get('/broadcast-session/'+( clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId? clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId:"100609346426084") + id);
  };
  getDetailTemplateSession = async (id: string) => {
    const hisEmail=getUserCookies().email;
    const response = await this.get(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/broadcast-session/'+( clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId? clientPhonenumber.find((item)=>item.email===hisEmail)?.numberId:"100609346426084")+"/" +
        id
    );
    return response.data;
  };
}
