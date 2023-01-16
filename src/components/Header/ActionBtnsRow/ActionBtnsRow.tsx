import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { AuthContext } from '../../../context/AuthProvider';
import { setShowFilter } from '../../../store/reducers/FilterSlice';
import { useAppDispatch } from '../../../store/hooks';

const ActionBtnsRow = () => {
    const [showLoginButton, setShowLoginButton] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const authUser = useContext(AuthContext);
    const navigate = useNavigate();

    const routeChange = () => {
        navigate('/login');
    }

    const signOut = async () => {
        await auth.signOut();
        setShowLoginButton(false);
    };
    
    return (
        <div className="flex gap-3 md:gap-8 ml-auto ">
            <button
                className="w-12 h-12  rounded-full flex justify-center items-center bg-[#212121]"
                onClick={() => dispatch(setShowFilter())}
            >
                <img src="/assets/images/filter.png" width={25} height={25} alt="" />
            </button>
            <div className="relative">
                <button onClick={() => setShowLoginButton(!showLoginButton)} className="w-12 h-12 border border-gray-100 rounded-full overflow-hidden flex justify-center items-center font-semibold text-xl text-[#E8E8E8]">
                    {authUser.user?.photoURL ? <img src={`${authUser.user?.photoURL}`} alt="" /> : <span>?</span>}
                </button>
                {showLoginButton &&
                    (
                        <button
                            onClick={authUser.user ? signOut : routeChange}
                            className='absolute top-14 z-20 right-0 py-5 px-16 min-w-max rounded-xl bg-[#212121] text-sm text-[#E8E8E8]'
                        >
                            {authUser.user ? 'Sign out' : 'Sign in'}
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default ActionBtnsRow