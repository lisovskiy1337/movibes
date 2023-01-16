import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { IRecommendation } from '../../../types/IRecommendation';
import { useGetRecommendationsQuery } from '../../../store/reducers/MoviesSlice';
import { MyParams } from '../../../types/IParams';

interface IActionGroup {
  voteAverage: number | undefined,
  voteCount: number | undefined,
}

const ActionGroup: React.FC<IActionGroup> = ({ voteAverage, voteCount }) => {
  const { videoType, id } = useParams() as MyParams;
  const { data: recommendations } = useGetRecommendationsQuery({ videoType, id })
  const recommendationsToMap = recommendations?.results;

  return (
    <div className='w-full max-w-sm lg:pl-4'>
      <div className="flex justify-center lg:justify-end items-center gap-3">
        <button><img width={28} height={28} src="/assets/images/detail-page/like.svg" alt="" /></button>
        <button><img width={28} height={28} src="/assets/images/detail-page/share.svg" alt="" /></button>
        <button><img width={28} height={28} src="/assets/images/detail-page/save.svg" alt="" /></button>
        <div className="flex gap-2 items-center text-md text-[#666666]">
          <img width={28} height={28} src="/assets/images/detail-page/star.svg" alt="" />
          <span className='text-lg text-[#E8E8E8]'>{voteAverage}</span> | {voteCount}
        </div>
      </div>
      <div className="my-4 flex flex-col gap-4">
        <button className='w-full py-3 px-1 rounded-xl text-white flex justify-center items-center gap-2 bg-[#3DD2CC]'>
          <img width={25} height={25} src="/assets/images/detail-page/tickets.svg" alt="" />
          See Showtimes
        </button>
        <button className='w-full py-3 px-1 rounded-xl text-white flex justify-center items-center gap-2 bg-[#0d0d0dcd]'>
          <img width={25} height={25} src="/assets/images/detail-page/list.svg" alt="" />
          More watch options
        </button>
      </div>
      <div className="grid grid-cols-3 rounded-xl overflow-hidden">
        {recommendationsToMap?.slice(0, 3).map((rec: IRecommendation) => (
          <Link to={`/${videoType}/${rec?.id}`} key={rec.poster_path}>
            <div className="h-36 relative" key={rec.poster_path}>
              <img className='absolute top-0 left-0 w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${rec.poster_path}`} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ActionGroup