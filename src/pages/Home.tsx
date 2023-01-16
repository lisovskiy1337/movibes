import React from 'react'
import Filters from '../components/Filters/Filters'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import Sidebar from '../components/Sidebar/Sidebar'
import { useAppSelector } from '../store/hooks'

const Home = () => {
  const isFilterShown = useAppSelector(state => state.filter.showFilter)
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className="flex flex-col w-full px-6 py-8 relative">
        <Header />
        <div className="flex w-full">
          <Main />
          {isFilterShown ? <Filters /> : null}
        </div>
      </div>

    </div>
  )
}

export default Home