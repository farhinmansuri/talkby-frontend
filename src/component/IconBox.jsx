import React from 'react'
import parrot from '../assets/parrot.png'

const IconBox = () => {
    return (
        <div className='flex justify-center w-fit'>

            <img src={parrot} />
            <div>
                <h1 className=' text-2xl 
                text-brand
                '>TalkBy</h1>
                <h1 className='text-gen-text 
                text-xs'>Connect . Chat . Share</h1>

            </div>

        </div>
    )
}

export default IconBox
