import React, { useEffect, useState } from 'react'

import usePrevious from '../../hooks/usePrevious';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MovieItem from './MovieItem/MovieItem';
import { useGetAllMoviesQuery } from '../../store/reducers/MoviesSlice';
import { IMovie } from '../../types/IMovie';
import { useAppSelector } from '../../store/hooks';

interface ContentSectionProps {
  fetchUrl: string,
  title: string,
}

const ContentSection: React.FC<ContentSectionProps> = ({ fetchUrl, title }) => {

  const { data: movieList, isLoading } = useGetAllMoviesQuery(fetchUrl);
  const [filteredMovieList, setFilteredMovieList] = useState<any>([]);
  const [itemsToShow, setItemsToShow] = useState<number>(4);
  const prevCount = usePrevious(itemsToShow);
  const filter = useAppSelector(state => state.filter.filter);
  const arrToMap = filter.length ? filteredMovieList : movieList;

  useEffect(() => {
    const newArr = movieList?.filter(movie => movie.genre_ids.some((filterQuery: number) => filter.includes(filterQuery)))
    if (filter.length > 0) {
      setFilteredMovieList(newArr);
    } else {
      setFilteredMovieList([]);
    }
  }, [movieList, filter]);

  const handleShowAllMovies = () => {
    if (arrToMap) {
      if (itemsToShow !== arrToMap.length) {
        setItemsToShow(arrToMap.length)
      }
      else if (itemsToShow === arrToMap.length && prevCount) {
        setItemsToShow(prevCount);
      }
    }
  }

  if (arrToMap && arrToMap.length) {
    return (
      <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
        <section className='mt-12'>
          <div className='flex justify-between items-end'>
            <h3 className='text-xl text-[#E8E8E8] font-semibold'>{title}</h3>
            {prevCount && arrToMap.length > prevCount && (
              <button className='text-md text-[#666666] font-semibold' onClick={handleShowAllMovies}>
                {itemsToShow !== movieList?.length ? 'See all' : 'Show less'}
              </button>
            )}
          </div>
          {isLoading && <Skeleton containerClassName="flex gap-2 mt-8 w-full rounded-2xl" count={4} className='h-80 rounded-2xl relative' />}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {arrToMap?.slice(0, itemsToShow)?.map((movie: IMovie) => (
              <MovieItem movie={movie} fetchUrl={fetchUrl} key={movie.id} />
            ))}
          </div>
        </section>
      </SkeletonTheme>
    )
  }
  else return null


}

export default ContentSection