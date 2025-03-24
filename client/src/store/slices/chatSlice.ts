import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ChatState {
  messages: { senderId: string; message: string }[];
}

const initialState: ChatState = {
  messages: [],
};

// Fetch messages from backend
export const fetchMessages = createAsyncThunk("chat/fetchMessages", async (receiverId: string) => {
  const response = await axios.get(`http://localhost:5000/api/v1/chat/${receiverId}`, { withCredentials: true });
  return response.data;
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<{ senderId: string; message: string }>) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
