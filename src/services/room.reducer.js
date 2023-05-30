import { roomService } from "./room.service"

export const SET_ROOMS = 'SET_ROOMS'

const initialState = {
    rooms: [],
    // room: roomService.getLoggedinUser(),
}

export function roomReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case SET_ROOMS:
            newState = { ...state, rooms: action.rooms }
            break
        default:
    }
    // For debug:
    // window.roomState = newState
    // console.log('State:', newState)
    return newState

}
