import React, { useEffect, useState } from 'react'
import { EMAIL_PATTERN } from '../../commanUtil';
import IconBox from '../component/IconBox';
import { useForm } from 'react-hook-form';
import { FiEye, FiLock, FiMail } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChangePasswordAfterVerified } from '../hook/passwordHook';
import { RoutPath } from './RouthPath';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;
    const userId = location.state?.userId;

    const [showPassword, setShowPassword] = useState(false);
    const [confirm_showPassword, set_confirm_ShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()
    const password = watch('password');

    const { mutate } = useChangePasswordAfterVerified()

    const divBoxCSS = 'border-2 border-gray-700 rounded-2xl py-2 px-1 flex items-center mt-2';
    const iconCss = 'text-gray-500 text-xs ml-3';
    const eyeCss = 'text-gray-500 text-xl me-3 cursor-pointer';
    const inputCss = 'border-none text-gen-text w-full outline-none bg-transparent ml-2';
    const errorClass = 'text-red-600 mx-5 text-xs';
    const buttonCss = 'bg-brand rounded-xl mt-3 p-2 text-gen-text cursor-pointer w-full';
    const handleChangePassword = (data) => {
        const passData = {
            email,
            password: data.password,
            userId
        }
        mutate(passData, {
            onSuccess: (data) => {
                toast("Password change sucessfully.")
                navigate(RoutPath.LOGIN, { replace: true })
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
    return (
        <div className='bg-app-bg min-h-screen  h-screen p-1 flex flex-col'>

            <IconBox />
            <div className="grow flex flex-col md:flex-row">


                <div className="flex-1 flex flex-col p-5 justify-center">

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



                {/* <div className="hidden md:flex flex-1">
          <img src={login_illution} className='mt-10' />
        </div> */}

                <div className="
        flex-2
        flex
        justify-center
        items-center
        
    ">
                    <div className='border-2 border-box-border rounded-2xl p-5 bg-app-trans-bg w-full me-5 ml-3'>
                        <form onSubmit={handleSubmit(handleChangePassword)}>
                            <h1 className='text-gen-text'>Change Password</h1>
                            <h1 className='text-gray-600'>Change your password and reLogin to your account</h1>

                            <div>
                                <div className={` ${divBoxCSS}`}>
                                    <FiMail className={` ${iconCss}`} />

                                    <input type='input' className={` ${inputCss}`} placeholder='Email'

                                        {
                                        ...register('email', {
                                            required: "Email is required!",
                                            pattern: {
                                                value: EMAIL_PATTERN,
                                                message: 'Enter a valid email.'
                                            }
                                        })
                                        } />
                                </div>
                                {errors.email && <span className={` ${errorClass}`}>{errors.email.message}</span>}
                            </div>

                            <div>
                                <div className={` ${divBoxCSS}`}>
                                    <FiLock className={` ${iconCss}`} />
                                    <input type={showPassword ? "text" : "password"}
                                        className={` ${inputCss}`} placeholder='Password'
                                        {
                                        ...register('password', {
                                            required: "Password must required!",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters."
                                            }
                                        })
                                        }
                                    />
                                    <FiEye className={` ${eyeCss}`}
                                        onClick={() => setShowPassword(!showPassword)} />
                                </div>
                                {errors.password && <span className={` ${errorClass}`}>{errors.password.message}</span>}
                            </div>

                            <div>
                                <div className={` ${divBoxCSS}`}>
                                    <FiLock className={` ${iconCss}`} />
                                    <input type={confirm_showPassword ? "text" : "password"}
                                        className={` ${inputCss}`} placeholder='Confirm Password'
                                        {
                                        ...register('confirm_password', {
                                            required: "Confirm Password must required!",

                                            validate: (value) => value === password || "Passwords do not match",

                                        })
                                        }
                                    />
                                    <FiEye className={` ${eyeCss}`}
                                        onClick={() => set_confirm_ShowPassword(!confirm_showPassword)} />
                                </div>
                                {errors.confirm_password && <span className={` ${errorClass}`}>{errors.confirm_password.message}</span>}
                            </div>

                            <button
                                className={` ${buttonCss}`}
                                type='submit'
                            >
                                Change Password
                            </button>


                        </form>



                    </div>
                </div>

            </div>


        </div>
    )
}

export default ChangePassword
