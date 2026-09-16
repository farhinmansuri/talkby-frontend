import React, { useState } from 'react'

const SearchPage = () => {
        const [searchText, setSearchText] = useState("")
    return (
        <div className='bg-app-bg min-h-screen h-screen flex'>
            <div className='border-2 border-box-border rounded-2xl p-2 bg-app-trans-bg m-2 w-full h-fit'>
                <input type='text' placeholder='Search Chat or People'
                    className='outline-none text-gen-text text-xs w-full'
                    value={searchText} onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchPage
