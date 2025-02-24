/* base interface with shared properties */
export interface CountryBaseInfo {
    name: {
        common: string,
    },
    cca3: string,
    population: number,
    area: number,  
}

/* list view interface */
export interface CountryListInfo extends CountryBaseInfo {
    region: string,
    independent: boolean,
    unMember: boolean,
}

/* detail view interface */
export interface CountryDetailInfo extends CountryBaseInfo {
    flags: {
        svg: string,
        alt: string
    },
    name: {
        common: string,
        official: string
    }
    capital: string,
    subregion: string,
    languages: {
        [key: string]: string
    },
    currencies: {
        [key: string]: {
            name: string
        }
    },
    continents: string[],
    borders: string[]
}