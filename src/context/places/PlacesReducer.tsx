import { Feature } from "../../interfaces/places";

interface IPlacesState {
    isLoading: boolean
    userLocation?: [number, number] 
    isLoadingPlaces: boolean
    places: Feature[]
}

type PlacesAction = 
    | { type: "SET_USER_LOCATION"; payload: [number, number] }
    | { type: "SET_LOADING_PLACES" }
    | { type: "SET_PLACES"; payload: Feature[] }

export const PlacesReducer = (state: IPlacesState, action: PlacesAction) => {
    switch (action.type) {
        case "SET_USER_LOCATION":
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case "SET_LOADING_PLACES":
            return {
                ...state,
                isLoading: true,
                places: []
            }
        case "SET_PLACES":
            return {
                ...state,
                isLoading: false,
                places: action.payload
            }
        default:
            return state
    }
}