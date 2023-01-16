export interface IDetailPage {
    videoType: any,
    movieDetails: {
      overview: string,
      poster_path: string,
      release_date: string,
      first_air_date: string,
      original_title: string,
      name: string,
      runtime: number,
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
    },
    movieCredits: {
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
  }