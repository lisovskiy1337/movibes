import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMovie } from '../../types/IMovie'
import { api_key } from '../../api_key'
import { IRecommendations } from '../../types/IRecommendation'
import { IMovieCredits, IMovieDetail } from '../../types/Details'


export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    tagTypes: ['Movies'],
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3` }),
    endpoints: (build) => ({
        getAllMovies: build.query<IMovie[], string>({
            query: (fetchUrl: string) => ({
                url: `/${fetchUrl}?api_key=${api_key}&language=en-US&page=${Math.floor(Math.random() * 10) + 1}`,
            }),
            transformResponse: (response: any) => response.results,
            providesTags: res => ['Movies']
        }),
        getRecommendations: build.query<IRecommendations, { videoType: string, id: string }>({
            query: ({ videoType, id }) => ({
                url: `/${videoType}/${id}/recommendations?api_key=${api_key}&language=en-US`,
            })
        }),
        getMovieDetails : build.query<IMovieDetail, { videoType: string, id: string }>({
            query: ({ videoType, id }) => ({
                url: `/${videoType}/${id}?api_key=${api_key}&language=en-US`,
            })
        }),
        getMovieCredits: build.query<IMovieCredits, { videoType: string, id: string }>({
            query: ({ videoType, id }) => ({
                url: `/${videoType}/${id}/credits?api_key=${api_key}&language=en-US`,
            })
        })
    })
})

export const { useGetAllMoviesQuery, useGetRecommendationsQuery, useGetMovieDetailsQuery, useGetMovieCreditsQuery } = moviesApi