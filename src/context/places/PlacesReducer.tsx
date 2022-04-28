
interface IPlacesState {
    isLoading: boolean
    userLocation?: [number, number] 
}

type PlacesAction = {
    type: 'SET_USER_LOCATION'
    payload: [number, number]
}

export const PlacesReducer = (state: IPlacesState, action: PlacesAction) => {
    switch (action.type) {
        case "SET_USER_LOCATION":
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        default:
            return state
    }
}