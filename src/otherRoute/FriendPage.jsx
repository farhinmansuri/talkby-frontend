
import React, { useState } from 'react'
import { FaBell, FaSearch, FaUserFriends } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import SearchFriendCard from '../component/SearchFriendCard'
import useDebounce from '../hook/useDebounce'
import { useSearchUsers } from '../hook/chatHook'
import { useDispatch, useSelector } from 'react-redux'
import { ConversationType } from '../CommanUtils'
import { setCurrentConversation } from '../redux/currentConversation'
import { useNavigate } from 'react-router-dom'
import { removeAllMessages } from '../redux/MessagesSlice'

const FriendPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authUser = useSelector((state) => state.auth.user)
    const [searchText, setSearchText] = useState("")
    const debouncedSearch = useDebounce(searchText);
    const {
        data,
        isLoading,
        isFetching,
        isError,
    } = useSearchUsers({ searchText: debouncedSearch, self_id: authUser._id })
    const Searchedusers = data?.data || [];
    const textUser = {
        firstName: "abc",
        lastName: "qwert"
    }

    const onClickChat = ({ user }) => {
        const tempConversation = {
            type: ConversationType.PRIVATE,
            participants: [
                authUser._id,
                user._id
            ],
            opositeUser: user,
            _id: user.conversation_id || null

        }
        console.log(tempConversation)
        dispatch(setCurrentConversation({ conversation: tempConversation }))
        

        navigate(-1)

    }
    return (
        <div className='min-h-screen h-screen bg-app-bg flex'>
            <div className='flex-1 px-4'>
                <h1 className='text-gen-text mt-5 text-2xl'>Discover Pepple</h1>
                <p className='text-gen-text text-xs'>Find new friends and grow your network</p>
                <div className='border-2 border-box-border rounded-2xl 
                p-2 bg-app-trans-bg  w-full h-fit mt-4'>
                    <div className='w-full flex justify-center'>
                        <FaSearch size={14} className='text-gen-text' />
                        <input type='text' placeholder='Search Chat or People'
                            className='outline-none text-gen-text text-xs grow mx-2'
                            value={searchText} onChange={(e) => setSearchText(e.target.value)}
                        />
                        <MdClose size={14} className='text-gen-text cursor-pointer' />
                    </div>

                </div>
                <div>
                    {
                        Searchedusers.map((user) => (
                            <SearchFriendCard user={user} onClickChat={onClickChat} />
                        ))
                    }

                </div>
            </div>
            {/* <div className='flex-1 h-screen flex-row'>
                <div className='flex-1 mt-2 px-2'>

                    <div className='flex items-center  w-full'>
                        <FaBell size={12} className='text-gen-text mx-2' />
                        <p className='text-gen-text grow'>Friend Request (2)</p>
                        <p className='text-gen-text text-xs underline cursor-pointer'>View all</p>
                    </div>

                    <div>


                    </div>

                </div>
                <div className='flex-1 mt-2 px-2'>

                    <div className='flex items-center  w-full'>
                        <FaUserFriends size={12} className='text-gen-text mx-2' />
                        <p className='text-gen-text grow'>My Friend (2)</p>
                        <p className='text-gen-text text-xs underline cursor-pointer'>View all</p>
                    </div>

                    <div></div>

                </div>

            </div> */}

        </div>
    )
}

export default FriendPage
