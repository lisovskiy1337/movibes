
import { useState, useEffect, useCallback } from 'react'
import { api_key } from "../api_key";
import SignUpSidebar from '../components/SignUpSidebar/SignUpSidebar';


const SignUp = () => {
  const [bg, setBg] = useState('');
  const bg_url = `https://image.tmdb.org/t/p/original/${bg}`

  const fetchMyAPI = useCallback(async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}&language=en-US&page=${Math.floor(Math.random() * 10) + 1}`)
    const data = await response.json();
    const randomBg = await data?.results[Math.floor(Math.random() * data?.results?.length - 1)].backdrop_path;
    if (randomBg !== undefined || randomBg !== null) {
      setBg(randomBg);
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      fetchMyAPI();
    }

    return () => {
      isSubscribed = false;
    }

  }, [fetchMyAPI]);

  return (
    <div className="min-h-screen relative">
      <img src={`${bg ? bg_url : ''}`} className='absolute top-0 left-0 w-full h-full' alt="" />
      <SignUpSidebar />
    </div>
  )
}

export default SignUp;