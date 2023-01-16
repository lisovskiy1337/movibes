export interface IRecommendation {
    id: string,
    poster_path: string | null
}

export interface IRecommendations {
    results: IRecommendation[]
}