import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import MenuLi from './MenuLi';
import { useAppSelector } from '../../store/hooks';

interface IMenu {
  setToggleMenu?: React.Dispatch<React.SetStateAction<boolean>>
}
const Menu : React.FC<IMenu> = ({setToggleMenu}) => {
  const [sliderInfo, setSliderInfo] = useState({ height: 0, top: 0 });
  const ulRef = useRef<HTMLUListElement>(null);
  const stateTabIndex = useAppSelector(state => state.tab.tabIndex);

  useEffect(() => {
    const refCur = ulRef.current;
    const container = refCur?.children;
    if (container) {
      setSliderInfo(prevState => ({
        ...prevState,
        height: container[stateTabIndex].getBoundingClientRect().height,
        top: container[stateTabIndex].getBoundingClientRect().top - refCur.getBoundingClientRect().top
      }));
    }
  }, [stateTabIndex]);

  return (
    <nav className='mt-14 w-full relative'>
      <ul ref={ulRef}>
        <Link to='/' onClick={setToggleMenu ? () => setToggleMenu(false) : undefined}>
          <MenuLi
            tabIndex={0}
            tabData={[{ fetchUrl: 'movie/popular', title: 'Trending' }, { fetchUrl: 'movie/upcoming', title: 'Upcoming' }, { fetchUrl: 'tv/popular', title: 'TV Series' }]}
            posterUrlFetch="movie/popular"
            title='Home'
            imgUrl='home'
          />
        </Link>
        <Link to='/' onClick={setToggleMenu ? () => setToggleMenu(false) : undefined}>
          <MenuLi
            tabIndex={1}
            tabData={[{ fetchUrl: 'movie/popular', title: 'Trending' }, { fetchUrl: 'movie/top_rated', title: 'Top Rated' }, { fetchUrl: 'movie/upcoming', title: 'Upcoming' }]}
            posterUrlFetch="movie/popular"
            title='Movie'
            imgUrl='movies'
          />
        </Link>
        <Link to='/' onClick={setToggleMenu ? () => setToggleMenu(false) : undefined}>
          <MenuLi
            tabIndex={2}
            tabData={[{ fetchUrl: 'tv/popular', title: 'Popular' }, { fetchUrl: 'tv/top_rated', title: 'Top Rated' }]}
            posterUrlFetch="tv/popular"
            title='TV Series'
            imgUrl='tv'
          />
        </Link>
        <Link to='/' onClick={setToggleMenu ? () => setToggleMenu(false) : undefined}>
          <MenuLi
            tabIndex={3}
            tabData={[{ fetchUrl: 'movie/popular', title: 'Latest movies' }, { fetchUrl: 'tv/popular', title: 'Latest TV Series' }]}
            posterUrlFetch="movie/popular"
            title='Latest'
            imgUrl='upcoming'
          />
        </Link>
      </ul>
      <div
        className="absolute right-0 top-0 w-1 bg-[#3DD2CC] transition-all duration-300"
        style={{ transform: `translateY(${sliderInfo.top}px)`, height: `${sliderInfo.height}px` }}></div>
    </nav>
  )
}

export default Menu