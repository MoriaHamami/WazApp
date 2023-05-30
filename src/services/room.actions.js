// import { userService } from "../services/user.service.js";

import { SET_ROOMS} from "./room.reducer.js";
// import { REMOVE_ROOM, SET_ROOM, SET_ROOMS, SET_WATCHED_ROOM } from "./user.reducer.js";
import { store } from "./store.js";
// import { roomService } from "./room.service.js";

// export async function loadUsers() {
//     try {
//         store.dispatch({ type: LOADING_START })
//         const rooms = await roomService.getUsers()
//         store.dispatch({ type: SET_ROOMS, rooms })
//     } catch (err) {
//         console.log('UserActions: err in loadUsers', err)
//     } finally {
//         store.dispatch({ type: LOADING_DONE })
//     }
// }

// export async function removeUser(roomId) {
//     try {
//         await roomService.remove(roomId)
//         store.dispatch({ type: REMOVE_ROOM, roomId })
//     } catch (err) {
//         console.log('UserActions: err in removeUser', err)
//     }
// }

export async function setRooms(rooms) {
    try {
        // const room = await roomService.login(creds)
        // console.log('room2:', room)
        store.dispatch({
            type: SET_ROOMS,
            rooms
        })
        // return room
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

// export async function signup(credentials) {
//     try {
//         const room = await roomService.signup(credentials)
//         store.dispatch({
//             type: SET_ROOM,
//             room
//         })
//         return room
//     } catch (err) {
//         console.log('Cannot signup', err)
//         throw err
//     }
// }

// export function logout() {
//     try {
//         roomService.logout()
//         store.dispatch({
//             type: SET_ROOMS,
//             room: null
//         })
//     } catch (err) {
//         console.log('Cannot logout', err)
//         throw err
//     }
// }

// export async function loadUser(roomId) {
//     try {
//         const room = await roomService.getById(roomId);
//         store.dispatch({ type: SET_WATCHED_ROOM, room })
//     } catch (err) {
//         showErrorMsg('Cannot load room')
//         console.log('Cannot load room', err)
//     }
// }