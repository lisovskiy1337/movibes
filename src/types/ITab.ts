export interface ITab {
    tabIndex: number,
    posterUrlFetch: string,
    tabData: {
        fetchUrl: string;
        title: string;
    }[]

}