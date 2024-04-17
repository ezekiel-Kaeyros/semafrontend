import { createSlice } from '@reduxjs/toolkit';
import { ChatBotType, ConversationsType,ChatsByCompanyReturnType,ChatConversationType } from './types';

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
      const { conversations, selectedConversation, id, message, messageTime, client, name } = action.payload; 
      const newConversation = conversations?.map((coversation: ConversationsType) => {
        if (coversation?.id === selectedConversation) {
          // console.log("selectedConversation: ", data, coversation?.id, coversation, selectedConversation, coversation?.messages)
          const data = {
            id: id, message: message, messageTime: messageTime, client: !coversation?.client, name
          }
          return {...coversation, messages: [...coversation.messages, data], client: !coversation?.client }; 
        }; 
        return coversation
      }); 
      // console.log("result: ", newConversation)
      state.conversations = newConversation
      // state.conversation?.messages?.push(action.payload)
    }, 
    addConversation: (state, action) => {
      state.conversations.push(action.payload)
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
      state.companychats=action.payload
    },
    setConversationChats: (state, action) => {
     
      state.chatsConversation = action.payload;
    },
      setChats: (state, action) => {
      state.message = action.payload;
    }
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
    setConversationChats
    // updateConversation, 
} = auth.actions;
export default auth.reducer;
