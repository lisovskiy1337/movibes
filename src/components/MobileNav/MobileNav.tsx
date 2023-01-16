import React, { useEffect, useRef, useState } from 'react'
import Menu from '../Menu/Menu'

const MobileNav = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside({ target }: MouseEvent) {
            if (ref.current && !ref.current.contains(target as Node)) {
                setToggleMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return (
        <div ref={ref} className='hidden mobile-nav'>
            <div className={`hamburger hamburger--minus ${toggleMenu ? 'is-active' : ''}`}>
                <div className="hamburger-box" onClick={() => setToggleMenu(!toggleMenu)}>
                    <div className="hamburger-inner"></div>
                </div>
            </div>
            {toggleMenu && (<div className="mobile-menu fixed top-0 left-0 w-[75%] min-h-screen z-40 bg-[#212121] py-10">
                <Menu setToggleMenu={setToggleMenu} />
            </div>)}
        </div>
    )
}

export default MobileNav