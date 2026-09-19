import React, { useEffect, useRef, useState } from 'react'
import IconBox from '../component/IconBox'
import { FaClock } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RoutPath } from './RouthPath';
import LoaderOval from '../component/LoaderOval';
import { usePasswordSendOTP, useVerifyOtp } from '../hook/passwordHook';
import toast from 'react-hot-toast';


const OTP_Page = () => {
    const navigate = useNavigate()
    const location = useLocation()


    const email = location.state?.email;
    const inputCss = 'border-none text-gen-text  outline-none bg-transparent  text-center w-14 h-14';
    const divBoxCSS = 'border-2 border-gray-700 rounded-2xl  flex items-center mt-2 w-14 h-14';
    const buttonCss = ' rounded-xl mt-3 p-2 text-gen-text cursor-pointer w-full';

    const [error, setError] = useState("")
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const isComplete = otp.every((digit) => digit !== "");
    const handleChange = (value, index) => {
        // Allow only numbers 
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); setOtp(newOtp);
        // Move to next input 
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();

        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input on Backspace 
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();

        }
    };


    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData("text").replace(/\D/g, "")
            .slice(0, 4);
        if (!pastedData) return;
        const newOtp = ["", "", "", ""];
        pastedData.split("").forEach((digit, index) => {
            newOtp[index] = digit;
        });
        setOtp(newOtp);
        // Focus last filled input 
        const lastIndex = Math.min(pastedData.length - 1, 3);
        inputRefs.current[lastIndex]?.focus();
    };

    const OTP_EXPIRY_TIME = 1 * 60; // 10 minutes
    const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_TIME);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const { mutate, isPending } = usePasswordSendOTP()
    const { mutate: verifyOtpMutate, isPending: verifyOtpIsPending } = useVerifyOtp()


    const sendOtp_callAPI = () => {
        mutate({ email }, {
            onSuccess: (data) => {
                try {
                    setTimeLeft(OTP_EXPIRY_TIME)

                } catch (error) {

                }
            },
            onError: (err) => {

                toast(err.response?.data?.message)
                // navigate(-1)
            }
        })

    }


    const resendOTP = () => {
        sendOtp_callAPI();
    }

    const handleVerifyOTP = () => {
        const otpValue = otp.join("");
        const payload = {
            email,
            otp: otpValue
        }
        console.log(payload)
        verifyOtpMutate(payload, {
            onSuccess: (data) => {
                const userId = data.data
                toast("OTP verified!")

                navigate(RoutPath.CHANGE_PASSWOR, { state: { 'email': email, 'userId': userId } })
            },
            onError: (err) => {
                try {
                    toast(err.response?.data?.message)

                } catch (error) {
                    console.log(error)

                }
            }
        })



    }
    const gotoChangePassword = () => {
        navigate(RoutPath.CHANGE_PASSWOR)
    }

    return (
        <div className='min-h-screen h-screen bg-app-bg flex flex-col'>

            <div>
                <IconBox />
            </div>
            <div className="grow flex flex-col md:flex-row">
                <div className="flex-2 flex flex-col p-5 justify-center">

                    <h1 className="
            text-gen-text
            text-2xl
            text-left
            ms-2 md:ms-10
            mt-5
        ">
                        stay connected, securely
                    </h1>



                    <p className="
            text-gen-text
            text-xs
            text-left
            mx-2 md:mx-10
            my-5
        ">
                        TalkBy is modern chat platform that brings people
                        together. Simple, secure and always within reach.
                    </p>


                </div>
                <div className="
        grow
        flex
        justify-center
        items-center
        
    ">
                    <div className='border-2 border-box-border rounded-2xl p-5 bg-app-trans-bg w-full me-5 ml-3'>

                        <h1 className='text-gen-text text-center text-2xl'>Verify OTP</h1>
                        <h1 className='text-gen-text text-center'>{`we sent a 4-digit code to your email address ${email}. Enter it below to continue.`}</h1>


                        <div className='flex justify-center items-center'>
                            <div className='flex justify-center gap-3 w-fit'>
                                {
                                    otp.map((digit, index) => (
                                        <div className={` ${divBoxCSS}`}>

                                            <input
                                                className={` ${inputCss}`}
                                                key={index}
                                                ref={(element) => { inputRefs.current[index] = element; }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleChange(e.target.value, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                onPaste={handlePaste}
                                            />
                                        </div>
                                    ))
                                }


                            </div>
                        </div>

                        <div className='flex px-4 items-center'>
                            <FaClock className='text-gen-text text-xs' />

                            <div className='ml-1'>
                                <p className='font-semibold ml-1 text-gen-text text-xs'>
                                    OTP expires in{" "}
                                    <span className="font-semibold ml-1 text-gen-text text-xs">
                                        {String(minutes).padStart(2, "0")}:
                                        {String(seconds).padStart(2, "0")}
                                    </span>
                                </p>

                            </div>
                        </div>
                        <div className='px-4'>
                            <button
                                className={` rounded-xl mt-3 p-2 text-gen-text  w-full
                                     ${!isComplete ? 'bg-gray-500 cursor-not-allowed' : 'bg-brand cursor-pointer'}`}
                                onClick={handleVerifyOTP}
                                disabled={!isComplete}
                            >
                                Verify
                            </button>
                        </div>
                        <div className='mx-4'>
                            <span className='text-red-600 text-xs'>{error}</span>
                        </div>
                        <div>

                            <p className='mt-4 text-center text-gen-text text-sm'>didn't get a code? {' '}
                                <span className="font-semibold text-brand  hover:underline transition duration-150 cursor-pointer"
                                    onClick={resendOTP}>
                                    resend
                                </span>
                            </p>
                        </div>


                    </div>

                </div>
            </div>
            <LoaderOval showLoader={isPending} />
            <LoaderOval showLoader={verifyOtpIsPending} />

        </div>
    )
}

export default OTP_Page
