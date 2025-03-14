/* base interface with shared properties */
export interface CountryBaseInfo {
    name: {
        common: string,
    },
    flags: {
        svg: string,
        alt?: string | undefined
    },
    cca3: string,
    population: string,
    area: string,
    subregion: string,  
}

/* list view interface */
export interface CountryListInfo extends CountryBaseInfo {
    region: string,
    independent: boolean,
    unMember: boolean,
}

/* detail view interface */
export interface CountryDetailInfo extends CountryBaseInfo {
    name: {
        common: string,
        official: string
    }
    capital: string,
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