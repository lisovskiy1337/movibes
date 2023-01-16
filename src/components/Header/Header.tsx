import React from 'react'
import MobileNav from '../MobileNav/MobileNav';
import Search from './Search/Search';
import ActionBtnsRow from './ActionBtnsRow/ActionBtnsRow';

const Header = () => {

    return (
        <header className='flex items-center gap-2 md:gap-8 mb-4' >
            <MobileNav />
            <Search />
            <ActionBtnsRow />
        </header >
    )
}

export default Header