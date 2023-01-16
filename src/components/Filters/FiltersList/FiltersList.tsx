import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter, uncheckAllFilters } from '../../../store/reducers/FilterSlice'
import { useAppSelector } from '../../../store/hooks'

const inputArr = [
  { genreId: 35, genreName: 'Comedy' },
  { genreId: 16, genreName: 'Animation' },
  { genreId: 28, genreName: 'Action' },
  { genreId: 12, genreName: 'Adventure' }

]

interface IFilterListProps {
  checkboxArr?: [],
  filterTitle?: string

}

const FiltersList: React.FC<IFilterListProps> = () => {
  const dispatch = useDispatch();
  const toggleFilter = (genre: number) => {
    dispatch(setFilter(genre));
  }
  const filter = useAppSelector(state => state.filter.filter);

  const handleUncheckAll = () => {
    dispatch(uncheckAllFilters());
  }

  return (
    <div className='mb-8  sticky top-0'>
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-md text-[#E8E8E8]">Categories</h3>
        <button className="text-sm text-[#666666]" onClick={handleUncheckAll}>Uncheck all</button>
      </div>
      <form action="" className='bg-[#212121] rounded-2xl p-4 flex flex-col gap-2 w-full '>
        {inputArr.map(input => (
          <div className='flex justify-between items-center py-2 border-b-2 border-[#666666] checkbox-wrapper' key={input.genreId}>
            <input type="checkbox" checked={filter.includes(input.genreId)} name={input.genreName} id={input.genreName} className='checkbox' onChange={() => toggleFilter(input.genreId)} />
            <label htmlFor={input.genreName} className='text-sm text-[#E8E8E8]'>{input.genreName}</label>
          </div>
        ))}

      </form>
    </div>
  )
}

export default FiltersList