import { useMutation } from "@tanstack/react-query"
import { changePasswodAfterOtpVerified, sendOptToEmail, verifyOtp } from "../api/endpoints"


export const usePasswordSendOTP = () => {
    return useMutation({
        mutationFn: sendOptToEmail
    })
}
export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: verifyOtp
    })
}

export const useChangePasswordAfterVerified =()=>{
    return useMutation({
        mutationFn:changePasswodAfterOtpVerified
    })
}