import React from 'react'
import ActionGroup from './ActionGroup/ActionGroup'
import DetailsList from './DetailsList/DetailsList'
import { useGetMovieCreditsQuery, useGetMovieDetailsQuery } from '../../store/reducers/MoviesSlice'
import { useParams } from 'react-router-dom'
import { MyParams } from '../../types/IParams'


const Detail = () => {
  const { videoType, id } = useParams() as MyParams;
  const { data: movieDetails } = useGetMovieDetailsQuery({ videoType, id })
  const { data: movieCredits } = useGetMovieCreditsQuery({ videoType, id })
  const convertMinsToHrsMins = (mins: number) => {
    if (mins) {
      let h = Math.floor(mins / 60);
      let m = mins % 60;
      const hWithZeros = h < 10 ? '0' + h : h;
      const mWithZeros = m < 10 ? '0' + m : m
      return `${hWithZeros} ${h > 1 ? 'hours' : 'hour'} ${mWithZeros} ${m > 1 ? 'minutes' : 'minute'}`;
    }
  }

  const videoPanelInfo = () => {
    if (videoType === 'movie') {
      return `${movieDetails?.original_title} • ${movieDetails?.release_date.substring(0, 4)} • ${convertMinsToHrsMins(movieDetails?.runtime)}`
    }
    else if (videoType === 'tv') {
      return `${movieDetails?.name} • ${movieDetails?.first_air_date.substring(0, 4)} • ${movieDetails?.number_of_episodes} episodes`
    }
  }

  return (
    <div className='h-screen overflow-y-scroll'>
      <div className="w-full relative rounded-3xl h-[280px]">
        <img className='absolute top-0 left-0 w-full h-full rounded-3xl object-cover' src={`https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`} alt="" />
      </div>
      <div className="mt-6">
        <div className="flex flex-col sm:items-center lg:flex-row gap-4 lg:gap-0">
          <div>
            <div className="flex flex-col lg:flex-row items-center gap-3 text-[#E8E8E8] ">
              <div className="text-lg mr-2">{videoPanelInfo()}</div>
              <div className='flex gap-3'>
                {movieDetails?.genres.map((genre) => (
                  <div className="px-2 py-1 rounded-full  border border-[#E8E8E8] text-xs flex items-center justify-center" key={genre.id}>{genre.name}</div>
                ))}
              </div>
            </div>
            <p className="mt-6 text-md text-[#E8E8E8]">{movieDetails?.overview}</p>
            <DetailsList movieDetails={movieDetails!} movieCredits={movieCredits!} videoType={videoType} />
          </div>
          <ActionGroup voteAverage={movieDetails?.vote_average} voteCount={movieDetails?.vote_count} />
        </div>
      </div>
    </div>
  )
}

export default Detail