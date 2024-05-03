export interface ConversationsType {
  _id: string;
  id: number;
  status: string;
  client: boolean;
  time?: any;
  selected: false;
  deadline?: any;
  hours?: number;
  minutes?: number;
  seconds?: number;
  timer?: any;
  messageDateTime: string;
  online: boolean;
  name: string;
  messages: MessageType[];
}
export type ChatMessageType = {
  text: string;
  is_bot: boolean;
  is_admin: boolean;
  date?: string;
  is_read?: boolean;
};

export type ChatConversationType = {
  _id?: string;
  phone_number: string;
  chat_messages: ChatMessageType[];
};

export type ChatsByCompanyReturnType = {
  data?: any;
  status?: number;

  _id: string;
  phone_number_id: string;
  company?: string;
  conversations: ChatConversationType[];
};

export interface MessageType {
  id: number;
  message: string;
  messageTime: string;
  client: boolean;
  name: string;
}

interface ChildLabel {
  parent: string;
  child?: ChildLabel[];
  uuid: string;
  selected: boolean;
}

export interface ParentLabel {
  parent: string;
  child: ChildLabel[];
  uuid: string;
  selected: boolean;
}

export interface Props {
  interactive_labels: ParentLabel[];
}

export interface ModalSliceType {
  openModalToggle: boolean;
  closeModalToggle: boolean;
  modalTogle: boolean;
  interactive_labels: {
    parent: string;
    child: ChildLabel[];
    uuid: string;
    selected: boolean;
  }[];
}

export type TypeItemTableSaveTemplete = {
  nametemplete?: string;
  categorytemplete?: string;
  statutTemplete?: string;
  languageTemplete?: string;
  imgTemplete?: string;
  textTemplete?: string;
  titleTemplete?: string;
  Tagline?: string;
  name?: string;
  status?: string;
  id?: string;
};

export interface ChatBotType {
  sideBarToggle: boolean;
  displayChatUiToggle: boolean;
  displayClientInfoInChatToggle: boolean;
  selectedConversation: number;
  selectedConversationObj: ConversationsType;
  conversations: ConversationsType[];
  chats: MessageType[];
  clearTimerInterval?: boolean;
  firstTime?: boolean;
  companychats: ChatsByCompanyReturnType;
  chatsConversation: ChatConversationType[];
  message: ChatConversationType;
}

export interface BulkMessageTabSilceType {
  sendMessageToggle: boolean;
  savedTemplateToggle: boolean;
  historyToggle: boolean;
  bulkMessageTabs?: BulkMessageTabTypeI[];

  tableTemplete: TypeItemTableSaveTemplete[];
  itemTableTemplete: TypeItemTableSaveTemplete;
  isRefresh: boolean;
}

export interface TombolaServiceTabSilceType {
  // sendMessageToggle: boolean;
  // savedTemplateToggle: boolean;
  // historyToggle: boolean;
  tombolaServiceTabs?: BulkMessageTabTypeI[];
}

export type BulkMessageTabTypeI = {
  id: number;
  label: string;
  selected: boolean;
  // func?: any;
  // tabData?: any;
};

export type PricingTypeI = {
  id: string;

  // func?: any;
  // tabData?: any;
};
export type TombolaServiceTabTypeI = {
  id: number;
  label: string;
  selected: boolean;
  func?: any;
  tabData?: any;
};

export type BulkMessageAllTabsTypeI = BulkMessageTabTypeI[];

export interface BulkMessageTabSilceType {
  sendMessageToggle: boolean;
  savedTemplateToggle: boolean;
  historyToggle: boolean;
}

export interface ForSingleElementForm {
  message: string;
}

export interface FilterActionsProps {
  scenario: string;
  id: number;
  scenarioCases: [
    {
      label: string;
      id: number;
      data: [{ label: string; id: number }];
    },
  ];
}
