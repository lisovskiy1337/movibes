import React from 'react'
import Menu from '../Menu/Menu'


const Sidebar = () => {

  return (
    <aside className='sidebar xs:w-20 flex-none xl:w-52  bg-[#212121] h-screen rounded-tr-2xl rounded-br-2xl py-8  text-center flex flex-col items-center'>
      <img className='w-[60%] hidden lg:block' src="/assets/images/logo.svg" alt="" />
      <Menu />
    </aside>
  )
}

export default Sidebar