import React, { useEffect } from "react"
import searchApi from "../../api/searchApi"
import { getUserLocation } from "../../helpers/getUserLocation"
import { Feature, IPlaces, PlacesResponse } from "../../interfaces/places"
import { PlacesReducer } from "./PlacesReducer"

const INITIAL_STATE: IPlaces = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
}

interface IPlacesContext {
    isLoading: boolean
    userLocation?: [number, number]
    isLoadingPlaces: boolean
    places: Feature[]
    searchPlaces: (query: string) => Promise<Feature[]>
}

const PlacesContext = React.createContext<IPlacesContext>({} as IPlacesContext)

interface IProps {
    children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: IProps) => {
    const  [state, dispatch] = React.useReducer(PlacesReducer, INITIAL_STATE)

    useEffect(() => {
       getUserLocation().then(location => {
           dispatch({
               type: "SET_USER_LOCATION",
               payload: location
           })
         })
    }, [])

    const searchPlaces = async(query: string): Promise<Feature[]> => {
        if( query.length === 0 ) {
            dispatch({ type: "SET_PLACES", payload: [] })
            return []
        }
        if( !state.userLocation ) throw new Error("User location is not defined")

        dispatch({
            type: "SET_LOADING_PLACES"
        })

        const response = await searchApi.get<PlacesResponse>(`/${query}.json`, {
            params: {
                proximity: state.userLocation.join(','),
            }
        })

        dispatch({
            type: "SET_PLACES",
            payload: response.data.features
        })
        return response.data.features
    }

    return (
        <PlacesContext.Provider value={{ ...state, searchPlaces }}>
            { children }
        </PlacesContext.Provider>
    )
}

export const usePlaces = () => {
    const context = React.useContext(PlacesContext)

    if (context === undefined) {
        throw new Error("usePlaces must be used within a PlacesProvider")
    }

    return context
}
