export interface IMovie  {
    id: number | string,
    backdrop_path: string | undefined,
    vote_average: number,
    genre_ids: number[]
}