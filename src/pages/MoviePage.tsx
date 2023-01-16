import React from 'react'
import Detail from '../components/Detail/Detail';
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'

const MoviePage = () => {
  return (
    <>
      <div className='flex h-screen'>
        <Sidebar />
        <div className="flex flex-col w-full px-6 py-8 ">
          <Header />
          <Detail/>
        </div>

      </div>
    </>
  )
}

export default MoviePage