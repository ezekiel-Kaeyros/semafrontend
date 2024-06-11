import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ChatBotType,
  ConversationsType,
  ChatsByCompanyReturnType,
  ChatConversationType,
} from './types';

// Just a boiler plate, this file needs to be updated

const initialState: ChatBotType = {
  sideBarToggle: false,
  displayChatUiToggle: false,
  selectedConversation: 0,
  selectedConversationObj: {} as ConversationsType,
  displayClientInfoInChatToggle: false,
  conversations: [],
  chats: [],
  clearTimerInterval: false,
  firstTime: true,
  companychats: {} as ChatsByCompanyReturnType,
  chatsConversation: [],
  message: {} as ChatConversationType,
  filterStatus: '',
  conversationStatus: '',
  currentChatStatus: '',
  arrayStatus: [],
  selectedStatus: '',
  companyId: '',
  loadingStatus: false,
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.sideBarToggle = action.payload;
    },
    toggleDisplayChatUI: (state, action) => {
      state.displayChatUiToggle = action.payload;
    },
    toggleDisplayClientInfoInChatUI: (state, action) => {
      state.displayClientInfoInChatToggle = action.payload;
    },

    addChat: (state, action) => {
      const {
        conversations,
        selectedConversation,
        id,
        message,
        messageTime,
        client,
        name,
      } = action.payload;
      const newConversation = conversations?.map(
        (coversation: ConversationsType) => {
          if (coversation?.id === selectedConversation) {
            // //
            const data = {
              id: id,
              message: message,
              messageTime: messageTime,
              client: !coversation?.client,
              name,
            };
            return {
              ...coversation,
              messages: [...coversation.messages, data],
              client: !coversation?.client,
            };
          }
          return coversation;
        }
      );
      state.conversations = newConversation;
    },
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
    },
    selectAConversation: (state, action) => {
      const { dataSelected, id } = action.payload;
      state.selectedConversation = id;
      state.selectedConversationObj = dataSelected;
    },
    setClearTimerInterval: (state, action) => {
      state.clearTimerInterval = action.payload;
    },
    setFirstimeTrue: (state, action) => {
      state.firstTime = true;
    },
    setFirstimeFalse: (state, action) => {
      state.firstTime = false;
    },
    setCompanyChats: (state, action) => {
      state.companychats = action.payload;
    },
    setConversationChats: (state, action) => {
      state.chatsConversation = action.payload;
    },
    setChats: (state, action) => {
      state.message = action.payload;
    },

    setFilteredStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    setConversationStatus: (state, action) => {
      state.conversationStatus = action.payload;
    },

    setCurrentChatStatus: (state, action) => {
      state.currentChatStatus = action.payload;
      // console.log(action.payload, 'payload');
    },

    setArrayStatus: (state, action) => {
      const { id, status, color } = action.payload;
      const dummyArr = state.arrayStatus;
      if (dummyArr.length === 0) {
        state.arrayStatus = [action.payload];
      } else {
        const check = dummyArr.filter((item) => item.id != id);
        check.push(action.payload);
        state.arrayStatus = check;
      }
    },

    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },

    setCompanyId: (state, action) => {
      state.companyId = action.payload;
    },

    setLoadingStatus: (state, action) => {
      state.loadingStatus = action.payload;
    },
  },
});

export const {
  // login,
  setChats,
  toggleSideBar,
  toggleDisplayChatUI,
  toggleDisplayClientInfoInChatUI,
  addChat,
  addConversation,
  selectAConversation,
  setClearTimerInterval,
  setFirstimeTrue,
  setFirstimeFalse,
  setCompanyChats,
  setConversationChats,
  setFilteredStatus,
  setConversationStatus,
  setCurrentChatStatus,
  setArrayStatus,
  setSelectedStatus,
  setCompanyId,
  setLoadingStatus,
  // updateConversation,
} = auth.actions;
export default auth.reducer;
