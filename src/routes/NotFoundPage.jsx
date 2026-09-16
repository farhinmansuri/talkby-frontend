import React from 'react'
import { Link } from 'react-router-dom'
import { RoutPath } from './RouthPath'

const NotFoundPage = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center bg-app-bg'>
            <h1 className='text-gen-text text-4xl text-center'>404 - Not Found</h1>

            <p className='text-gen-text text-2xl text-center'>The page you are looking for does not exist.</p>
            <Link to={RoutPath.HOME}  className='text-gen-text cursor-pointer underline mt-2'>Go To Home</Link>
        </div>
    )
}

export default NotFoundPage
