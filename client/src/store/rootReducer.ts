import { combineReducers } from "@reduxjs/toolkit";

import postModalReducer from "./slices/postModal.slice";
// import other reducers here...

const rootReducer = combineReducers({
  postModal: postModalReducer,
  // auth: authReducer,
  // user: userReducer,
  // theme: themeReducer,
});

export default rootReducer;
