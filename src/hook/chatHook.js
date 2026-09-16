import { useMutation, useQuery } from '@tanstack/react-query'
import { createNewConversation, getConversationMessages, getMyConversations, searchUsers } from '../api/endpoints'

export const useSearchUsers = ({ searchText = "", self_id = "" }) => {
    return useQuery({
        queryKey: [searchText],
        queryFn: () => searchUsers({ searchText: searchText, self_id: self_id }),
        placeholderData: (previousData) => previousData,
        enabled: searchText.trim().length > 0,
        staleTime: 30000,
    })
}

export const useCreateConversation = (conversationData) => {
    return useMutation({
        mutationFn: createNewConversation
    })
}

export const useGetMyConversation = ({ userId }) => {
    return useQuery({
        queryKey: ['myConversation'],
        queryFn: () => getMyConversations({ userId }),
        placeholderData: (previousData) => previousData,
    })
}

export const useGetMessages = ({ conversationId, page, limit }) => {
    return useQuery({
        queryKey: ['messages', [conversationId, page, limit]],
        queryFn: () => getConversationMessages({ conversationId, page, limit }),
        enabled: Boolean(conversationId),
        placeholderData: (previousData) => previousData,
    })
}