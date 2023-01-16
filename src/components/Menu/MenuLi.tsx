import React from 'react'
import { useDispatch } from 'react-redux';
import { changeTab } from '../../store/reducers/TabSlice';
import { useAppSelector } from '../../store/hooks';


interface liProps {
  tabIndex: number,
  posterUrlFetch: string,
  children?: React.ReactNode,
  title: string,
  tabData: {
    fetchUrl: string;
    title: string;
  }[],
  imgUrl: string
}

const MenuLi: React.FC<liProps> = ({ tabIndex, posterUrlFetch, tabData, children, title, imgUrl }) => {
  const dispatch = useDispatch();
  const stateTabIndex = useAppSelector(state => state.tab.tabIndex);

  return (
    <li
      className={`py-6 px-4 xs:px-8 flex items-end gap-1 relative text-[#666666] ${stateTabIndex === tabIndex ? 'active-tab' : ''} transition-colors duration-300  cursor-pointer`}
      data-tabindex={tabIndex}
      data-posterurlfetch={posterUrlFetch}
      data-tabdata={tabData}
      onClick={() => dispatch(changeTab({ tabIndex, posterUrlFetch, tabData }))}>
      {children}
      <img className='w-6 h-6' src={`/assets/images/menu/${imgUrl}.png`} alt="" />
      <span className='menu__link-title font-semibold hidden lg:block'>{title}</span>
    </li>
  )
}

export default MenuLi