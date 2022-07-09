import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  isLoading: true,
};

export const messagesSlice = createSlice({
  name: "messagesState",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessagesIsLoading: (state, action) => {
      console.log("set messages is loading called");
      state.isLoading = action.payload;
    },
  },
});

export const { setMessages, addMessage, setMessagesIsLoading } =
  messagesSlice.actions;
export const selectMessagesState = (state) => state.messagesState;
export default messagesSlice.reducer;
