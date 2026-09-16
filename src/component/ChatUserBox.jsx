import React from 'react'
import { ConversationType, getTimeText } from '../CommanUtils';
import { useDispatch } from 'react-redux';
import { setCurrentConversation } from '../redux/currentConversation';

const getMyInitials = ({ text1, text2 }) => {
    return `${text1[0] || ''}${text2[0] || ''}`.toUpperCase();
}
const ChatUserBox = ({ conversation }) => {

    const dispatch = useDispatch()

    const user = conversation.opositeUser
    const makeThisConversationAsCurrent = () => {
        dispatch(setCurrentConversation({ conversation: conversation }))
    }

    const initails = conversation.type == ConversationType.PRIVATE ?
        getMyInitials({ text1: user.firstName, text2: user.lastName }) : conversation.name[0];

    

    
    return (
        <div className='flex border border-light-brand 
        hover:bg-light-brand 
    w-full p-2 rounded-xl mt-2 
    cursor-pointer
    '
            onClick={makeThisConversationAsCurrent}>
            <div className='flex-1 flex items-center'>
                <div className=' rounded-2xl bg-brand p-0.5 
                    border-3 border-app-bg h-fit'>
                    <p>{initails}</p>
                </div>
            </div>
            <div className='flex-2 flex-row  justify-start'>
                <p className='text-gen-text'>{user.firstName} {user.lastName}</p>
                {
                    conversation.lastMessageText && <p className='text-gen-text text-xs'>{conversation.lastMessageText}</p>
                }

            </div>
            <div className='flex-1'>
                <div className='flex-row items-end justify-end'>
                    <p className='text-end text-gen-text text-xs'>{getTimeText(conversation.lastMessageCreatedAt    )}</p>
                    <div className='w-full flex justify-end'>
                        {/* <div className=' flex rounded-2xl bg-brand p-0.5 
                     h-fit w-fit'>
                            <p className='text-xs'>03</p>
                        </div> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatUserBox
