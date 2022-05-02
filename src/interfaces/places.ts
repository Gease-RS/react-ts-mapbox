
export interface IPlaces {
    isLoading: boolean
    userLocation?: [number, number] 
    isLoadingPlaces: boolean
    places: Feature[]
}

export interface PlacesResponse {
    type: string;
    query: string[];
    features: Feature[];
    attribution: string;
}

export interface Feature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: Properties;
    text_ptBr: string;
    place_name_ptBr: string;
    text: string;
    place_name: string;
    bbox?: number[];
    center: number[];
    geometry: Geometry;
    context: Context[];
}

export interface Context {
    id: string;
    wikidata?: Wikidata;
    short_code?: ShortCode;
    text_ptBr: string;
    language_ptBr?: string;
    text: string;
    language: Language
}

export enum Language {
    Pt = 'ptBr',
}

export enum ShortCode {
    BR = "br",
    BRRS = "BR-RS"
}

export enum Wikidata {
    Q10286985 = "Q10286985",
    Q9721028 = "Q9721028",
    Q800 = "Q800",
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    foursquare?: string;
    landmark?: boolean;
    category?: string;
    maki?: string;
    address?: string;
}