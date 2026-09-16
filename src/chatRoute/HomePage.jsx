import React, { useEffect, useState } from 'react'
import IconBox from '../component/IconBox'
import ThemeChanger from '../component/ThemeChanger'
import ChatUserBox from '../component/ChatUserBox'
import { FaSearch } from 'react-icons/fa'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RoutPath } from '../routes/RouthPath'
import socket from '../socket/socket'
import useDebounce from '../hook/useDebounce'
import { useGetMyConversation, useSearchUsers } from '../hook/chatHook'
import CurrenChatMessage from './CurrenChatMessage'

const HomePage = () => {
    const authUser = useSelector((state) => state.auth.user)

    const currentConversation = useSelector((state) => state.conversation.conversation)
    const firstName = authUser.firstName
    const lastName = authUser.lastName
    const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
    const navigate = useNavigate()
    const gotoProfile = () => {
        navigate(RoutPath.PROFILE)
    }
    const gotoSearchPage = () => {
        navigate(RoutPath.SEARCH)
    }
    useEffect(() => {
        //join to Personal room
        socket.emit("join_conversation", authUser._id)
    }, [])
   
    const [recievedMessage, setRecievedMessage] = useState(null);


    useEffect(() => {
        const handleRecieveMessage = (message) => {
            console.log("New message:", message);

            //check conversationId
            try {
                if (message.conversationId && message.conversationId === currentConversation._id) {
                
                    setRecievedMessage(message)
                } else {
                    console.log("New message:", " for another conversation")
                    
                }
              // referesh Conversation pannel
              refetch()

            } catch (error) {

            }


        }

        socket.on("receive_message", handleRecieveMessage)
        return () => {

            socket.off(
                "receive_message",
                handleRecieveMessage
            );

        };
    }, [])
    useEffect(() => {
        if (!authUser?._id) return

        socket.connect();
        socket.on('connect', () => {
            console.log("Socket connected:", socket.id);
            socket.emit(
                "user_connected",
                authUser._id
            );

        })



        socket.on("disconnect", () => {

            console.log("Socket disconnected");
        });


        return () => {
            socket.off("connect");
            socket.off("disconnect");

            socket.disconnect();
        }


    }, [authUser?._id])


    const [searchText, setSearchText] = useState("")


    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetMyConversation({ userId: authUser._id });
    const myConversation = data?.data || [];



    return (
        <div className='h-screen bg-app-bg flex'>
            <div className='flex-2 p-5 '>
                <div className='flex-row'>
                    <IconBox />
                    <div className='mt-5 '>
                        <h1 className='text-gen-text text-xl ml-3'>Chat</h1>
                        <div className='border-2 border-box-border rounded-2xl p-2 bg-app-trans-bg mt-2'>
                            <input type='text' placeholder='Search Chat or People'
                                className='outline-none text-gen-text text-xs w-full'
                                value={searchText} onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        <div className='mt-5'>
                            {/* chat list  */}


                            {
                                myConversation.map((conver) => (
                                    <ChatUserBox conversation={conver} />
                                ))
                            }
                        </div>


                    </div>
                </div>




            </div>
            <div className='flex-5 w-full h-screen flex flex-col pe-5'>
                <div className=' w-full flex  justify-end items-center py-5 '>

                    <div>
                        <FaSearch size={16} className='text-gen-text me-2 cursor-pointer' onClick={gotoSearchPage} />
                    </div>
                    <div className='rounded-2xl bg-brand p-0.5 
                    border-3 border-app-bg hover:border-gray-500
                    cursor-pointer'

                        onClick={gotoProfile}>
                        <p>{initials}</p>
                    </div>
                    <ThemeChanger />
                </div>
                <div className='border-2 border-box-border bg-app-trans-bg rounded-2xl p-5  w-full 
                flex-1 overflow-y-auto mb-5 flex'>

                    {currentConversation ?
                        <CurrenChatMessage conversation={currentConversation} receivedMessage={recievedMessage} /> :
                        <div>
                            <p className='text-gen-text text-2xl '>No Chat is selected right now!</p>
                        </div>
                    }

                </div>

            </div>


        </div>
    )
}

export default HomePage
