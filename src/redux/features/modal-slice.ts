import { createSlice } from "@reduxjs/toolkit";
import { ModalSliceType } from "./types";


const initialState: ModalSliceType = {
    openModalToggle: false, 
    closeModalToggle: false, 
    modalTogle: false
};

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
      toggleOpenModal: (state, action) => {
          state.modalTogle = action.payload;
      }, 
      toggleCloseModal: (state, action) => {
        state.modalTogle = action.payload;
      }, 
    },
});

export const { 
    toggleOpenModal, 
    toggleCloseModal
} = modalSlice.actions;
export default modalSlice.reducer;