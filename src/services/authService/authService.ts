import { DataServiceUserService } from '../dataServiceUserService';

export class AuthService extends DataServiceUserService {
  login = async (data: { email: string; password: string }) => {
    try {
      const response = await this.post(
        'https://tmil8s59c9.execute-api.eu-central-1.amazonaws.com/login',
        data
      );
      // ;
      alert('login');
      return response.data;
    } catch (error) {
      // ;
      alert('dinge');
    }
  };
  login2 = (data: {
    email: string;

    password: string;
  }): Promise<{ data: any; status: any }> => {
    return this.post('/login', data);
  };

  register = (data: {
    email: string;

    password: string;
    phone: string;
    company: string;
  }): Promise<{ data: any; status: any }> => {
    return this.post('/signup', data);
  };

  register2 = async (data: {
    email: string;
    phone: string;
    password: string;

    company: string;
  }) => {
    const response = await this.post(
      'https://tmil8s59c9.execute-api.eu-central-1.amazonaws.com/signup',
      data
    );

    // ;

    alert('stoppa');

    return response?.data?.data;
  };

  forgottenPassword = (data: any) => {
    return this.post('/auth/forgottenPassword', data);
  };

  retrievePosts = async () => {
    const response = await this.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return response.data;
  };
}
