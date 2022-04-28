import React, { useEffect } from "react"
import { getUserLocation } from "../../helpers/getUserLocation"
import { PlacesReducer } from "./PlacesReducer"

interface IPlaces {
    isLoading: boolean
    userLocation?: [number, number] 
}

const INITIAL_STATE: IPlaces = {
    isLoading: true,
    userLocation: undefined
}

const PlacesContext = React.createContext<IPlaces>({} as IPlaces)

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

    return (
        <PlacesContext.Provider value={{ ...state, }}>
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
