// import { BulkMessageTabType } from "@/app/common/components/bulk-messages/bulk-message-tabs/bulk-message-tab/bulkMessageTab";
import { createSlice } from "@reduxjs/toolkit";
import {
  BulkMessageTabSilceType,
  BulkMessageTabTypeI,
  TypeItemTableSaveTemplete,
} from './types';



const initialState: BulkMessageTabSilceType = {
  sendMessageToggle: true,
  savedTemplateToggle: false,
  historyToggle: false,
  bulkMessageTabs: [
    {
      id: 1,
      label: 'Send Message',
      selected: true,
    },
    {
      id: 2,
      label: 'History ',
      selected: false,
    },
    {
      id: 3,
      label: 'Templates',
      selected: false,
    },
  ],

  itemTableTemplete: {} as TypeItemTableSaveTemplete,
  tableTemplete: [],
  isRefresh: false,
};

export const bulkMessageReducer = createSlice({
  name: 'bulkMessageReducer',
  initialState,
  reducers: {
    toggleSendMessageToggle: (state, action) => {
      state.sendMessageToggle = action.payload;
    },
    toggleSavedTemplateToggle: (state, action) => {
      state.savedTemplateToggle = action.payload;
    },
    toggleHistory: (state, action) => {
      state.historyToggle = action.payload;
    },
    changeTab: (state, action) => {
      const { tabData, id } = action.payload;
      const updatedTabData = tabData?.map((tab: BulkMessageTabTypeI) => {
        if (tab?.id === id) {
          return { ...tab, selected: true };
        }
        return { ...tab, selected: false };
      });

      state.bulkMessageTabs = updatedTabData;
    },
    toggleToFilled: (state, action) => {
      state.historyToggle = action.payload;
    },

    fillTableTemplete: (state, action) => {
      state.tableTemplete = action.payload;
    },
    addItemTableTemplete: (state, action) => {
      state.tableTemplete.push(action.payload);
    },
    getItemTableTemplete: (state, action) => {
      state.itemTableTemplete = action.payload;
    },
    refesh: (state, action) => {
      state.isRefresh=action.payload
    }
   
  },
});
  
export const {
  toggleSendMessageToggle,
  toggleSavedTemplateToggle,
  toggleHistory,
  changeTab,
  refesh,
 
  addItemTableTemplete,
} = bulkMessageReducer.actions;
  export default bulkMessageReducer.reducer;