import React, { useEffect, useState, useCallback } from 'react'
import { api_key } from '../../api_key';
import ContentSection from '../ContentSection/ContentSection'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';


const Main = () => {
  const [moviePoster, setMoviePoster] = useState<any>();
  const [imgLoaded, setImageLoaded] = useState<boolean>(true);
  const stateTabUrlFetch = useAppSelector(state => state.tab.posterUrlFetch);
  const stateTabData = useAppSelector(state => state.tab.tabData);
  const bg_url = `https://image.tmdb.org/t/p/original/${moviePoster?.backdrop_path}`

  const fetchMyAPI = useCallback(async () => {
    const response = await fetch(`https://api.themoviedb.org/3/${stateTabUrlFetch}?api_key=${api_key}&language=en-US&page=${Math.floor(Math.random() * 10) + 1}`)
    const data = await response.json();
    const randomBg = await data?.results[Math.floor(Math.random() * data?.results?.length - 1)];
    if (randomBg !== undefined || randomBg !== null) {
      setMoviePoster(randomBg);
      setImageLoaded(false);
    }

  }, [stateTabUrlFetch]);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      fetchMyAPI();
    }

    return () => {
      isSubscribed = false;
    }

  }, [fetchMyAPI])

  return (
    <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
      <main className='flex-1 max-h-[85vh] overflow-y-scroll'>
        <section>
          {imgLoaded ? <Skeleton containerClassName="flex gap-4 mt-8 w-full rounded-2xl" className='rounded-2xl h-[280px] w-full relative flex' />
            : (
              <Link to={`${stateTabUrlFetch.includes('tv') ? 'tv' : 'movie'}/${moviePoster?.id}`}>
                <div className='rounded-2xl h-[280px] w-full relative flex'>
                  <img src={`${moviePoster ? bg_url : ''}`} className='absolute top-0 left-0 w-full h-full rounded-2xl object-cover' alt="" />
                  <div className="flex gap-6 mt-auto mb-4 ml-auto mr-4">
                    <button className="movie--btn inline-flex justify-center gap-2 items-center px-4 py-1 rounded-lg font-semibold text-[#E8E8E8] bg-slate-100 relative z-10">
                      <img src="/assets/images/movies-icons/play.svg" alt="" />
                      Play
                    </button>
                    <button className="movie--btn inline-flex justify-center gap-2 items-center px-4 py-1 rounded-lg font-semibold text-[#E8E8E8] bg-slate-100 relative z-10">
                      <img src="/assets/images/movies-icons/info.svg" alt="" />
                      More Info
                    </button>
                  </div>
                </div>
              </Link>
            )}

        </section>
        {stateTabData.map((item) => (
          <ContentSection key={item.title} fetchUrl={item.fetchUrl} title={item.title} />
        ))}
      </main>
    </SkeletonTheme>
  )
}

export default Main