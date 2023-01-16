import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { auth } from '../../firebase';

interface LoginFormValues {
    email: string,
    password: string
}

const LoginSidebar = () => {
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formError, setFormError] = useState<any>('');
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const lsUserName = localStorage.getItem('last-user')
    const currentUserName = lsUserName !== null ? JSON.parse(lsUserName).split(" ")[0] : '';
    const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPasswordShown(!passwordShown);
    }
    const signInGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            try {
                navigate('/');
            } catch (error) {
                console.log(`🚀 ~ signup error`, error)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const signInWithEmailAndPassWord = async ({ email, password }: LoginFormValues) => {
        if (email.length && password.length) {
            try {
                await signIn(email, password)
                try {
                    navigate('/');
                } catch (error) {
                    console.log(`🚀 ~ signup error`, error)
                }
            } catch (error) {
                setFormError(error);
            }
        }
    }

    return (
        <div className='absolute min-h-screen top-0 left-0 bg-[#191919] w-full md:w-[400px] lg:w-[480px] py-24 px-16 text-center'>
            <h2 className='text-2xl font-semibold text-[#FEFEFE]'>Welcome back {currentUserName}!</h2>
            <p className="mt-2 text-[#BABABA]">Please enter your details.</p>
            <button
                className="w-full p-4 border border-[#BABABA] hover:border-[#FEFEFE] transition-colors duration-300 rounded-xl text-lg text-[#FEFEFE] flex justify-center items-center gap-4 my-6"
                onClick={signInGoogle}
            >
                <img src="/assets/images/google.svg" alt="" />
                Log in with Google
            </button>
            <form action="" className='my-10 flex flex-col gap-6'>
                <div className="relative flex items-center text-[#BABABA] before:w-[50%] before:mr-4 before:h-[1px] before:bg-[#4D4B4B] after:w-[50%] after:ml-4 after:h-[1px] after:bg-[#4D4B4B]">or</div>
                <input
                    type="text"
                    name='email'
                    className='bg-transparent w-full p-2 border-b border-[#BABABA] focus:border-[#FEFEFE] transition-colors duration-300  text-[#BABABA] outline-none'
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                />
                <div className='flex relative'>
                    <input
                        type={passwordShown ? "text" : "password"}
                        name='password'
                        className='bg-transparent w-full p-2 border-b border-[#BABABA] focus:border-[#FEFEFE] transition-colors duration-300  text-[#BABABA] outline-none'
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className='absolute right-0 top-[50%] -translate-y-[50%] bg-[#191919]' onClick={e => handleShowPassword(e)}>
                        {passwordShown ?
                            <img className='w-6 h-6' src="/assets/images/hide.png" alt="" />
                            :
                            <img className='w-6 h-6' src="/assets/images/show.png" alt="" />
                        }
                    </button>
                </div>
                {formError ? <p className='text-left text-red-600'>Error '{formError?.code}'. Try Again!</p> : null}
            </form>
            <button
                className="w-full p-4 bg-[#FEFEFE] hover:bg-[#0e0e0e] hover:text-[#FEFEFE] transition-colors duration-300 rounded-xl text-lg font-semibold mb-6"
                onClick={() => signInWithEmailAndPassWord({ email, password })}
            >
                Log In
            </button>
            <span className='text-sm text-[#BABABA]'>Don’t have an account ? Sign up for free </span>
        </div>
    )
}

export default LoginSidebar