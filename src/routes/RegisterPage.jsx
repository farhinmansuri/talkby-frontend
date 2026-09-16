import React, { useState } from 'react'
import IconBox from '../component/IconBox'
import ThemeChanger from '../component/ThemeChanger'
import register_illution from '../assets/singup_chat.svg'
import { FiEye, FiLock, FiMail } from 'react-icons/fi'
import { MdPerson } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { EMAIL_PATTERN } from '../../commanUtil'
import { RoutPath } from './RouthPath'
import AuthHeader from '../component/AuthHeader'
import { useRegisterHook } from '../hook/authHook'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from "../redux/authSlice"
import toast from 'react-hot-toast'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [confirm_showPassword, set_confirm_ShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        defaultValues:{
            acceptTerms:true
        }
    })
    const password = watch('password');

    const { mutate } = useRegisterHook();
    const dispatch = useDispatch()


    const registerClick = (data) => {
        const userData = {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        }
        mutate(userData,
            {
                onSuccess: (data) => {
                    console.log('User registered successfully:', data);
                    dispatch(setCredentials({ user: data.data }))
                    navigate(RoutPath.HOME)

                },
                onError: (err) => {
                    console.log(err)
                    console.error('Registration failed:', err.response?.data?.message || err.message);
                    try {
                        toast(err.response?.data?.message)

                    } catch (error) {

                    }

                }
            }
        )

    }
    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }
    const divBoxCSS = 'border-2 border-gray-700 rounded-2xl py-2 px-1 flex items-center mt-2';
    const iconCss = 'text-gray-500 text-xs ml-3';
    const eyeCss = 'text-gray-500 text-xl me-3 cursor-pointer';
    const inputCss = 'border-none text-gen-text w-full outline-none bg-transparent ml-2';
    const errorClass = 'text-red-600 mx-5 text-xs';
    const buttonCss = 'bg-brand rounded-xl mt-3 p-2 text-gen-text cursor-pointer w-full';
    return (
        <div className='bg-app-bg min-h-screen  flex flex-col p-1'>
            <AuthHeader />
            <div className="grow flex flex-col md:flex-row">


                <div className="flex-1 flex flex-col px-5 mt-4">

                    <h1 className="text-gen-text  text-2xl text-left  ms-2 md:ms-10">
                        Better Conversations,
                    </h1>

                    <h1 className="text-gen-text   text-2xl  ms-2 md:ms-10  ">
                        Brighter Connections
                    </h1>

                    <p className="text-gen-text  text-xs  text-left mx-2 md:mx-10">
                        TalkBy is modern chat platform that brings people
                        together. Simple, secure and always within reach.
                    </p>

                    <img src={register_illution} className='h-[50%]' />

                </div>





                <div className="  flex-2  flex  justify-center items-center ">
                    <div className='border-2 border-box-border rounded-2xl p-5 bg-app-trans-bg w-full me-5 ml-3'>
                        <form onSubmit={handleSubmit(registerClick)}>
                            <h1 className='text-gen-text'>Create your account</h1>
                            <h1 className='text-gray-600'>It&apos;s quick and easy to get started.</h1>
                            <div>
                                <div>
                                    <div className={` ${divBoxCSS}`}>
                                        <MdPerson className={` ${iconCss}`} />

                                        <input type='input' className={` ${inputCss}`} placeholder='First name'

                                            {
                                            ...register('firstName', {
                                                required: "First name is required!",

                                            })
                                            } />
                                    </div>
                                    {errors.firstName && <span className={` ${errorClass}`}>{errors.firstName.message}</span>}
                                </div>

                                <div>
                                    <div className={` ${divBoxCSS}`}>
                                        <MdPerson className={` ${iconCss}`} />

                                        <input type='input' className={` ${inputCss}`} placeholder='Middle name'

                                            {
                                            ...register('middleName', {
                                                required: "middlw name is required!",

                                            })
                                            } />
                                    </div>
                                    {errors.middleName && <span className={` ${errorClass}`}>{errors.middleName.message}</span>}
                                </div>

                                <div>
                                    <div className={` ${divBoxCSS}`}>
                                        <MdPerson className={` ${iconCss}`} />

                                        <input type='input' className={` ${inputCss}`} placeholder='Last name'

                                            {
                                            ...register('lastName', {
                                                required: "Last name is required!",

                                            })
                                            } />
                                    </div>
                                    {errors.lastName && <span className={` ${errorClass}`}>{errors.lastName.message}</span>}
                                </div>
                            </div>



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


                            <div className='flex   items-center mt-3'>
                                <div className='flex w-fit'>
                                    <input type='checkbox'
                                    {...register("acceptTerms")}
                                     />
                                    <span className='text-gen-text text-xs ml-0.5'>I agree to the Terms of service and Privacy Policy</span>
                                </div>


                            </div>
                            <button
                                className={` ${buttonCss}`}
                                type='submit'
                            >
                                Sing Up
                            </button>


                        </form>
                        {/* <div className="flex items-center my-6">
             
              <div className="flex-grow h-px bg-gray-300"></div>

              
              <span className="flex-shrink mx-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                OR
              </span>

             
              <div className="flex-grow h-px bg-gray-300"></div>
            </div> */}

                        <p className='mt-4 text-center text-gen-text text-sm'>Already have account? {' '}
                            <Link
                                onClick={goBack}
                                className="font-semibold text-brand  hover:underline transition duration-150">
                                Login</Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage
