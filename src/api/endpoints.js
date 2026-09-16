import { useId } from "react"
import api from "./api"

export const registerUser = async (credentials) => {
    const response = await api.post("/user/register", credentials)
    return response.data
}
export const loginUser = async (credentials) => {
    const response = await api.post("/user/login", credentials)
    return response.data
}

export const searchUsers = async ({ searchText: searchText, self_id: self_id }) => {
    const response = await api.get("/chat/searchUser", { params: { searchText, self_id } })
    return response.data
}
export const createNewConversation = async (conversationData) => {
    const response = await api.post("/chat/createNewConversation", conversationData)
    return response.data
}
export const getMyConversations = async ({ userId }) => {
    const response = await api.get("/chat/getMyConversations", { params: { userId } })
    return response.data
}
export const getConversationMessages = async ({ conversationId, page, limit, }) => {
    const response = await api.get("/chat/getConversationMessage", { params: { conversationId, page, limit } })
    return response.data
}