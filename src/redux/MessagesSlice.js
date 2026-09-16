import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    messages: []
}
const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            const { messages } = action.payload;
            state.messages = messages;
        },
        removeAllMessages:(state)=>{
            state.messages=[];
        }
    }
})
export const {setMessages,removeAllMessages}=messageSlice.actions
export default messageSlice.reducer
