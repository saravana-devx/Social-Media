import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface PostViewState {
  isOpen: boolean;
  post: any;
}

const initialState: PostViewState = {
  isOpen: false,
  post: [],
};

const postViewModalSlice = createSlice({
  name: "postViewModal",
  initialState,
  reducers: {
    openPostViewModal: (state, action: PayloadAction<any>) => {
      state.isOpen = true;
      state.post = action.payload;
    },
    closePostViewModal: (state) => {
      state.isOpen = false;
      state.post = [];
    },
  },
});

export const getPost = (state: RootState) => state.postViewModal.post;
export const getIsPostViewOpen = (state: RootState) =>
  state.postViewModal.isOpen;

export const { openPostViewModal, closePostViewModal } =
  postViewModalSlice.actions;

export default postViewModalSlice.reducer;
