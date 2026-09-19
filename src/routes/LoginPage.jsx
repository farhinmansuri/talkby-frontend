import React, { useState } from 'react'
import IconBox from '../component/IconBox'
import ThemeChanger from '../component/ThemeChanger'
import login_illution from '../assets/login_illution.svg'
import { FiEye, FiLock, FiMail } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { EMAIL_PATTERN } from '../../commanUtil'
import { RoutPath } from './RouthPath'
import AuthHeader from '../component/AuthHeader'
import { useNavigate } from 'react-router-dom'
import { useLoginHook } from '../hook/authHook'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../redux/authSlice'
import toast from 'react-hot-toast'
import LoaderOval from '../component/LoaderOval'
import { usePasswordSendOTP } from '../hook/passwordHook'
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()



  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const emailText = watch('email')
  const isEmailComplete = EMAIL_PATTERN.test(emailText || "")
  const {
    mutate
  } = useLoginHook()
  const loginClick = (data) => {
    const userData = {
      email: data.email,
      password: data.password
    }
    mutate(userData, {
      onSuccess: (data) => {
        dispatch(setCredentials({ user: data.data }))
        navigate(RoutPath.HOME)

      },
      onError: (err) => {
        try {
          toast(err.response?.data?.message)

        } catch (error) {
          console.log(error)

        }
      }
    })

    //

  }
  const { mutate: sendOtpMutate, isPending } = usePasswordSendOTP()
  const gotoOTP_page = () => {
    sendOtpMutate({ email: emailText }, {
      onSuccess: (data) => {
        navigate(RoutPath.OTPPAGE, { state: { 'email': emailText } })
      },
      onError: (err) => {
        toast(err.response?.data?.message)
      }
    })

  }

  const divBoxCSS = 'border-2 border-gray-700 rounded-2xl py-2 px-1 flex items-center mt-2';
  const iconCss = 'text-gray-500 text-xs ml-3';
  const eyeCss = 'text-gray-500 text-xl me-3 cursor-pointer';
  const inputCss = 'border-none text-gen-text w-full outline-none bg-transparent ml-2';
  const errorClass = 'text-red-600 mx-5 text-xs';
  const buttonCss = 'bg-brand rounded-xl mt-3 p-2 text-gen-text cursor-pointer w-full';
  return (
    <div className='bg-app-bg min-h-screen  h-screen p-1 flex flex-col'>

      <AuthHeader />
      <div className="grow flex flex-col md:flex-row">


        <div className="flex-1 flex flex-col p-5 justify-center">

          <h1 className="
            text-gen-text
            text-2xl
            text-left
            ms-2 md:ms-10
            mt-5
        ">
            Better Conversations,
          </h1>

          <h1 className="
            text-gen-text
            text-2xl
            ms-2 md:ms-10
        ">
            Brighter Connections
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



        <div className="hidden md:flex flex-1">
          <img src={login_illution} className='mt-10' />
        </div>

        <div className="
        flex-2
        flex
        justify-center
        items-center
        
    ">
          <div className='border-2 border-box-border rounded-2xl p-5 bg-app-trans-bg w-full me-5 ml-3'>
            <form onSubmit={handleSubmit(loginClick)}>
              <h1 className='text-gen-text'>Welcome Back</h1>
              <h1 className='text-gray-600'>Sing in to your account</h1>

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
              <div className='flex  justify-end items-center mt-3'>

                <div>
                  <span className={` text-xs text-brand cursor-pointer hover:underline 
                    ${isEmailComplete ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    onClick={gotoOTP_page}>Forgot password?</span>
                </div>

              </div>
              <button
                className={` ${buttonCss}`}
                type='submit'
              >
                Login
              </button>


            </form>
            {/* <div className="flex items-center my-6">
             
              <div className="flex-grow h-px bg-gray-300"></div>

              
              <span className="flex-shrink mx-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                OR
              </span>

             
              <div className="flex-grow h-px bg-gray-300"></div>
            </div> */}

            <p className='mt-4 text-center text-gen-text text-sm'>Do not have account? {' '}
              <Link
                to={RoutPath.SINGUP}
                className="font-semibold text-brand  hover:underline transition duration-150">
                Sing Up</Link>
            </p>
          </div>
        </div>

      </div>

      <LoaderOval showLoader={isPending} />
    </div>
  )
}

export default LoginPage
