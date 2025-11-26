import { combineReducers } from "@reduxjs/toolkit";

import postModalReducer from "./slices/postEditorModal.slice";
import postViewModalReducer from "./slices/postViewModal.slice";

const rootReducer = combineReducers({
  postModal: postModalReducer,
  postViewModal: postViewModalReducer,
});

export default rootReducer;
