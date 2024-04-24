export type ChatMessageType = {
  text: string;
  is_bot: boolean;
  is_admin: boolean;
  date?: string;
};

export type ChatConversationType = {
  phone_number: string;
  chat_messages: ChatMessageType[];
};

export type ChatsByCompanyReturnType = {
  status: number;
  data: {
    message: string;
    data: {
      _id: string;
      phone_number_id: string;
      company?: string;
      conversations: ChatConversationType[];
    };
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
