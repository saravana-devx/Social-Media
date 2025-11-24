import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PostModalState {
  isOpen: boolean;
  editingPost: any | null; // when not null => edit mode
}

const initialState: PostModalState = {
  isOpen: false,
  editingPost: null,
};

const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    openPostModal: (state, action: PayloadAction<any | undefined>) => {
      state.isOpen = true;
      state.editingPost = action.payload ?? null; // payload = post for edit, or undefined for create
    },
    closePostModal: (state) => {
      state.isOpen = false;
      state.editingPost = null;
    },
  },
});

export const { openPostModal, closePostModal } = postModalSlice.actions;
export default postModalSlice.reducer;
