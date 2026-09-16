import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../redux/authSlice'
import { removeConversation } from '../redux/currentConversation'

const ProfilePage = () => {
    const authUser = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const logoutUser = () => {
        dispatch(removeConversation())
        dispatch(setLogout())
        

    }
    return (
        <div className='flex flex-col items-center
        min-h-screen h-screen bg-app-bg  w-screen'>

            <div>
                <img src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover  mt-5 border-2 border-brand cursor-pointer" />
            </div>



            <h1 className='text-gen-text text-2xl' >{authUser.firstName}{' '}{authUser.middleName}{' '}{authUser.lastName}</h1>

            <p className='text-gen-text text-xs underline'>{authUser.email}</p>


            <p className='text-brand mt-5 underline  text-xl cursor-pointer' onClick={logoutUser}>Logout</p>
        </div>
    )
}

export default ProfilePage
