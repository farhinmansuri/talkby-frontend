import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversation:null
}
const conversationSlice = createSlice({
    name:'conversation',
    initialState,
    reducers: {
        setCurrentConversation: (state, action) => {
            const { conversation } = action.payload
            state.conversation = conversation
        },
        removeConversation: (state) => {
            state.conversation = null
        },
        updateConversationId:(state,action)=>{
            const{_id}=action.payload
            state.conversation._id=_id
        }
    }
})
export const { setCurrentConversation, removeConversation,updateConversationId } = conversationSlice.actions
export default conversationSlice.reducer