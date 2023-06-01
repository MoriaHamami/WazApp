// import { userService } from "../services/user.service.js";

import { SET_LOADER} from "./loader.reducer.js";
// import { REMOVE_LOADER, SET_LOADER, SET_LOADERS, SET_WATCHED_LOADER } from "./user.reducer.js";
import { store } from "./store.js";
// import { loaderService } from "./loader.service.js";

// export async function loadUsers() {
//     try {
//         store.dispatch({ type: LOADING_START })
//         const loaders = await loaderService.getUsers()
//         store.dispatch({ type: SET_LOADERS, loaders })
//     } catch (err) {
//         console.log('UserActions: err in loadUsers', err)
//     } finally {
//         store.dispatch({ type: LOADING_DONE })
//     }
// }

// export async function removeUser(loaderId) {
//     try {
//         await loaderService.remove(loaderId)
//         store.dispatch({ type: REMOVE_LOADER, loaderId })
//     } catch (err) {
//         console.log('UserActions: err in removeUser', err)
//     }
// }

export async function setLoader(isLoading) {
    try {
        // const loader = await loaderService.login(creds)
        // console.log('loader2:', loader)
        store.dispatch({
            type: SET_LOADER,
            isLoading
        })
        // return loader
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

// export async function signup(credentials) {
//     try {
//         const loader = await loaderService.signup(credentials)
//         store.dispatch({
//             type: SET_LOADER,
//             loader
//         })
//         return loader
//     } catch (err) {
//         console.log('Cannot signup', err)
//         throw err
//     }
// }

// export function logout() {
//     try {
//         loaderService.logout()
//         store.dispatch({
//             type: SET_LOADERS,
//             loader: null
//         })
//     } catch (err) {
//         console.log('Cannot logout', err)
//         throw err
//     }
// }

// export async function loadUser(loaderId) {
//     try {
//         const loader = await loaderService.getById(loaderId);
//         store.dispatch({ type: SET_WATCHED_LOADER, loader })
//     } catch (err) {
//         showErrorMsg('Cannot load loader')
//         console.log('Cannot load loader', err)
//     }
// }