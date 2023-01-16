import React from 'react'
import DetailListItem from '../DetailListItem/DetailListItem'
import { IDetailPage } from '../../../types/IDetailPage'


const DetailsList: React.FC<IDetailPage> = ({ movieDetails, movieCredits, videoType }) => {
  const filterByJob = (job: string) => movieCredits?.crew.filter(person => person.job === job);
  return (
    <ul className="w-full mt-2">
      <DetailListItem 
        title={videoType === 'movie' ? 'Directors' : 'Producers'} 
        crewData={filterByJob(`${videoType === 'movie' ? 'Director' : 'Producer'}`)}
      />
      <DetailListItem title='Production Companies' crewData={movieDetails?.production_companies}/>
      <DetailListItem title='Stars' crewData={movieCredits?.cast}/>
    </ul>
  )
}

export default DetailsList