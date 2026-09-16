import React from 'react'
import { LuMessageCircle, LuMessageCircleMore } from 'react-icons/lu';




const SearchFriendCard = ({ user, onClickChat }) => {
    
 
    
    const initails = `${user.firstName[0] || ''}${user.lastName[0] || ''}`.toUpperCase();
    return (
        <div className='flex border border-light-brand 
                
            w-full p-2 rounded-xl mt-2 
             items-center '>
            <div className=' flex items-center'>
                <div className=' rounded-2xl bg-brand p-0.5 
                    border-3 border-app-bg h-fit'>
                    <p>{initails}</p>
                </div>
            </div>
            <div className='flex-row  justify-start mx-2 grow' >
                <p className='text-gen-text'>{user.firstName} {user.lastName}</p>
                <p className='text-gen-text text-xs'>email is here</p>
            </div>
            <div className='flex'>
                <div className='flex-row items-end justify-end'>
                    <LuMessageCircleMore size={20}
                        className='text-gen-text me-4 cursor-pointer'
                        onClick={()=>onClickChat({user:user})} />
                </div>

            </div>
        </div>
    )
}

export default SearchFriendCard
