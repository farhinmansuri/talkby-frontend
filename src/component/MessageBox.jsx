import React, { useEffect } from 'react'
import { getTimeText, MessageType } from '../CommanUtils'

const MessageBox = ({ message, myId }) => {


    const selfMessage = message.senderId === myId

    return (
        <div className='w-full flex'>
            {message.messageType === MessageType.text && <>

                <div className={` w-full flex   ${selfMessage ? 'justify-end' : 'justify-start'}`}>
                    <div className='w-auto max-w-[75%] min-w-0 bg-brand  p-2  mb-2 rounded-2xl'>

                        <pre className='w-fit text-gen-text'>
                            {message.text}
                        </pre>
                        {message.createdAt && <p className='text-gray-600 text-[8px] text-end ml-4'>{getTimeText(message.createdAt)}</p>
                        }

                    </div>
                </div>

            </>
            }

        </div>
    )
}

export default MessageBox
