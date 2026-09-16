import React from 'react'
import IconBox from './IconBox'
import ThemeChanger from './ThemeChanger'

const AuthHeader = () => {
  return (
    <div className='flex justify-between pl-10 pr-5'>
        <IconBox />
        <ThemeChanger />
      </div>
  )
}

export default AuthHeader
