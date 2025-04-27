import { createSlice } from "@reduxjs/toolkit";
import { chat } from "../actions/chatAction";

const initialState = {
  chatData: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChatState: (state) => {
      state.chatData = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chat.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.chatData = []; 
      })
      .addCase(chat.fulfilled, (state, action) => {
        state.loading = false;
        state.chatData = action.payload;
        state.error = null;
      })
      .addCase(chat.rejected, (state, action) => {
        state.loading = false;
        state.chatData = []; 
        state.error = action.payload;
      });
  },
});

export const { resetChatState } = chatSlice.actions;
export default chatSlice.reducer;


