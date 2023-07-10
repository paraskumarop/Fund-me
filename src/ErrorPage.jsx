import React from 'react'
import { useRouteError } from 'react-router-dom'
import bgImage from './utils/blob-scene-haikei.svg';
function ErrorPage() {

    const error=useRouteError();
  return (
    <div className='error-Page h-full'>
    <div  className='flex justify-center items-center  ' >
      <div className='text-center p-2 m-2'>
        <h1 className=' font-extrabold text-4xl m-2'>Oops</h1>
        <i className='text-lg'>{error.message || error.statusText}</i>
         <p className='text-lg'>Error Page not Found!!</p>
      </div>
    </div>
    </div>
  )
}

export default ErrorPage