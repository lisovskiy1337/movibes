import React, {useState, useRef, useEffect} from 'react'
import useDebounce from '../../../hooks/useDebounce';
import { Link } from 'react-router-dom';
import { api_key } from '../../../api_key';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [SearchedData, setSearchedData] = useState<any[]>([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSearched = (e: any) => {
        setSearchTerm(e.target.value);
    };
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${debouncedSearchTerm}&page=1&include_adult=false`)
            .then((response) => response.json())
            .then((data) => setSearchedData(data.results));
    }, [debouncedSearchTerm]);

    useEffect(() => {
        function handleClickOutside({ target }: MouseEvent) {
            if (searchTerm.length > 0) {
                if (inputRef.current && !inputRef.current.contains(target as Node)) {
                    const t = setTimeout(() => {
                        setSearchTerm('')
                        setSearchedData([]);
                    }, 100);
                    return () => clearTimeout(t);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [inputRef, searchTerm]);

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                setSearchTerm('')
                setSearchedData([]);
                inputRef.current?.blur();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [])
    return (
        <div className="flex-[0_1_70%] relative" >
            <form className='w-full relative mr-2'>
                <input
                    ref={inputRef}
                    value={searchTerm}
                    type="text"
                    onChange={handleSearched}
                    placeholder='Search for movies, TV shows...'
                    className='w-full rounded-3xl py-2 bg-[#212121] border border-transparent shadow-sm outline-none pl-16 pr-2 text-[#BABABA] font-semibold focus:border-[#BABABA] transition-colors duration-300'
                />
                <button className='absolute w-8 h-8 left-6 top-[50%] -translate-y-[50%]'>
                    <img src="/assets/images/search.svg" alt="" />
                </button>
            </form>
            <ul className='searched absolute bg-[#212121] z-20 w-full  rounded-xl overflow-hidden flex flex-col gap-2 top-[60px]'>
                {SearchedData?.slice(0, 5).map(item => (
                    <Link to={`/movie/${item?.id}`}>
                        <li key={item.id} className='flex items-center'>
                            <img className='w-16 h-16 object-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`} alt="" />
                            <h4 className='ml-8 text-[#E8E8E8]'>{item.title}</h4>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Search