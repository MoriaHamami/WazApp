// import { loaderService } from "./loader.service"

export const SET_LOADER = 'SET_LOADER'

const initialState = {
    isLoading: true,
    // loader: loaderService.getLoggedinUser(),
}

export function loaderReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case SET_LOADER:
            newState = { ...state, isLoading: action.loaders }
            break
        default:
    }
    // For debug:
    // window.loaderState = newState
    // console.log('State:', newState)
    return newState

}
