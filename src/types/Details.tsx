export interface IMovieDetail {
  overview: string,
  poster_path: string,
  release_date: string,
  first_air_date: string,
  original_title: string,
  name: string,
  runtime: any,
  number_of_episodes: number,
  genres: {
    name: string,
    id: number
  }[],
  vote_average: number,
  vote_count: number,
  production_companies: {
    name: string,
    id: number
  }[],
}

export interface IMovieCredits {
  cast: {
    name: string,
    id: number
  }[],
  crew: {
    name: string,
    job: string,
    id: number
  }[]
}
