import { createSlice } from "@reduxjs/toolkit";

interface PostModalState {
  isOpen: boolean;
}

const initialState: PostModalState = {
  isOpen: false,
};

const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    openPostModal: (state) => {
      console.log("isOpen : ", state.isOpen);
      state.isOpen = true;
    },
    closePostModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openPostModal, closePostModal } = postModalSlice.actions;
export default postModalSlice.reducer;
