import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { auth } from '../../firebase';

interface SignUpFormValues {
    email: string,
    password: string
}

const SignUpSidebar = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const { signUp } = useAuth()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formError, setFormError] = useState<any>('')

    const navigate = useNavigate();
    const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPasswordShown(!passwordShown);
    }


    const handleSubmit = async ({ email, password }: SignUpFormValues, e: any) => {
        e.preventDefault();
        if (email.length && password.length) {
            try {
                await signUp(email, password)
                try {
                    navigate('/');
                } catch (error) {
                    console.log(`🚀 ~ signup error`, error)
                }
            } catch (error) {
                console.log('lwlqrqlrllr', error)
                setFormError(error);
            }
        }
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

    return (
        <div className='absolute min-h-screen top-0 right-0 bg-[#191919] w-full md:w-[400px] lg:w-[480px] py-24 px-16 text-center'>
            <h2 className='text-2xl font-semibold text-[#FEFEFE]' >Create an account</h2>
            <p className="mt-2 text-[#BABABA]">Let’s get started with your 30 days free trial.</p>
            <form action="" className='my-10 flex flex-col gap-6'>
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
            <button type="submit" onClick={e => handleSubmit({ email, password }, e)} className="w-full p-4 bg-[#FEFEFE] hover:bg-[#0e0e0e] hover:text-[#FEFEFE] transition-colors duration-300 rounded-xl text-lg font-semibold mb-6">Create account</button>

            <button onClick={signInGoogle} className="w-full p-4 border border-[#BABABA] hover:border-[#FEFEFE] transition-colors duration-300 rounded-xl text-lg text-[#FEFEFE] flex justify-center items-center gap-4 mb-6"><img src="/assets/images/google.svg" alt="" /> Sign up with Google</button>
            <span className='text-sm text-[#BABABA]'>Already have an account ? Log in</span>
        </div>
    )
}

export default SignUpSidebar