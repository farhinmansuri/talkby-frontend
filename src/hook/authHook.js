import { useMutation} from '@tanstack/react-query'
import {registerUser,loginUser} from '../api/endpoints'
export const useRegisterHook=()=>{
    return useMutation({
        mutationFn:registerUser
    })
}
export const useLoginHook=()=>{
    return useMutation({
        mutationFn:loginUser
    })
}