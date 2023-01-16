import React from 'react'
import { Link } from 'react-router-dom'

export interface MovieItemProps {
  movie: {
    id: number | string,
    backdrop_path: string | undefined,
    vote_average: number
  },
  fetchUrl: string
}
const MovieItem: React.FC<MovieItemProps> = ({ movie, fetchUrl }) => {
  return (
    <Link key={movie.id} to={`${fetchUrl.includes('tv') ? 'tv' : 'movie'}/${movie?.id}`}>
      <div key={movie?.backdrop_path} className='h-80 rounded-2xl relative'>
        <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} className='absolute top-0 left-0 w-full h-full rounded-2xl object-cover' alt="" />
        <div className="movie-rating absolute right-0 px-4 py-1 flex items-center gap-1 text-white">
          {movie?.vote_average > 0 ? (
            <>
              <img src="/assets/images/movies-icons/star.svg" alt="" />
              {movie?.vote_average}
            </>
          ) :
            'Unrated yet'
          }
        </div>
      </div>
    </Link>

  )
}

export default MovieItem