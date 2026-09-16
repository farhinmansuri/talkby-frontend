import React, { useEffect, useRef, useState } from 'react'
import { FaPaperclip } from 'react-icons/fa'
import { LuSend } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { ConversationType, MessageType } from '../CommanUtils'
import { useCreateConversation, useGetMessages } from '../hook/chatHook'
import { updateConversationId } from '../redux/currentConversation'
import socket from '../socket/socket'
import MessageBox from '../component/MessageBox'
import TextareaAutosize from 'react-textarea-autosize';

const CurrenChatMessage = ({ conversation, receivedMessage }) => {
    const dispatch = useDispatch()
    const authUser = useSelector((state) => state.auth.user)
    const [textMessage, setTextMessage] = useState("")
    const user = conversation.opositeUser
    const { mutate } = useCreateConversation();

    const [page, setPage] = useState(1)
    const limit = 10
    const {
        data,
        isLoading,
        isFetching,
        isError
    } = useGetMessages({
        conversationId: conversation?._id,
        page: page,
        limit: limit
    })
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!receivedMessage) return;

        setMessages((prev) => {
            const alreadyExists = prev.some(
                (message) => message._id === receivedMessage._id
            );

            if (alreadyExists) {
                return prev;
            }

            return [...prev, receivedMessage];
        });
    }, [receivedMessage])

    useEffect(() => {
        if (data?.data) {
            setMessages(data.data);
        }
    }, [data]);

    //  const messages = data?.data || [];
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "auto"
        });
    }, [messages]);


    const setMessageToServer = (con_id) => {
        //console.log("setMessageToServer ",con_id)

        const conversationId = con_id
        const messageType = MessageType.text
        const senderId = authUser._id
        const text = textMessage
        const lastSendedMessage = {
            conversationId: conversationId,
            senderId: senderId,
            text: text,
            messageType: messageType
        }
        socket.emit("send_message", lastSendedMessage)

        setMessages(prev => [...prev, lastSendedMessage]);

        setTextMessage("")



    }

    const sendMessage = () => {
        if (textMessage === "") {
       // console.log("not happen")
        } else {
            if (!conversation._id) {

                // create new conversation
                const type = conversation.type;
                const participants = conversation.participants
                const conversationData = {
                    type,
                    participants
                }

                mutate(conversationData, {
                    onSuccess: (data) => {
                        if (data.data) {
                            const createdConversation = data.data
                            if (createdConversation) {


                                dispatch(updateConversationId({ _id: createdConversation._id }))
                                setMessageToServer( createdConversation._id)
                            }
                        }


                    },
                    onError: (error) => { }
                })


            } else {
                //console.log("direct send message")
                setMessageToServer(conversation._id)

            }


        }
    }
    return (
        <div className='flex flex-col h-full w-full'>
            {/* Chat messages */}
            <div className='shrink-0 mx-2  border-b border-brand' >
                <p className='text-gen-text'>{user.firstName} {user.lastName}</p>
                {/* <p>{conversation._id}</p> */}

            </div>
            <div className='flex-1 overflow-y-auto  scrollbar-none'>


                <div>

                    {isLoading && (
                        <p className='text-gen-text'>
                            Loading messages...
                        </p>
                    )}
                    {messages && messages.map((message) => (
                        <div className='m-2'>
                            {


                                <MessageBox message={message} myId={authUser?._id} />
                            }

                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>


            </div>

            {/* Chat input - always at bottom */}
            <div className='flex items-end gap-3 mt-4
                                    border-2 border-box-border
                                    rounded-xl p-3 '>

                <FaPaperclip
                    className='text-brand cursor-pointer'
                    size={18}
                />

                <TextareaAutosize
                    minRows={1}
                    maxRows={5}
                    type='text'
                    placeholder='Type a message...'
                    className='flex-1 outline-none bg-transparent
                                       text-gen-text text-sm
                                       resize-none overflow-y-auto scrollbar-none'
                    value={textMessage}
                    onChange={(e) => { setTextMessage(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />

                <LuSend className='text-brand cursor-pointer'
                    size={18}
                    onClick={sendMessage} />

            </div>


        </div>

    )
}

export default CurrenChatMessage
