import { userService } from "./user.service"

export const SET_USER = 'SET_USER'

const initialState = {
    user: null,
    // user: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
