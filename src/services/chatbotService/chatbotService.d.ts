export type ChatMessageType = {
  text: string;
  is_bot: boolean;
  is_admin: boolean;
  date?: string;
  chat_status: string;
};

export type ChatConversationType = {
  chat_messages: ChatMessageType[];
  phone_number: string;
  unread_msg: number;
  color?: string | any;
  label?: string | any;
};

export type ChatsByCompanyReturnType = {
  status: number;
  data: {
    message: string;
    // data: {
    //   _id: string;
    //   phone_number_id: string;
    //   company?: string;
    //   conversations: ChatConversationType[];
    // };
    _id: string;
    phone_number_id: string;
    company?: string;
    conversations: ChatConversationType[];
  };
};

export type ChatsByNumberReturnType = {
  status: number;
  data: {
    message: string;
    data: {
      _id: string;
      phone_number_id: string;
      conversations: ChatConversationType[];
    };
  };
};
