import { createStore, combineReducers } from 'redux'

import { userReducer } from './user.reducer.js'
import { roomReducer } from './room.reducer.js'
import { loaderReducer } from './loader.reducer.js'

const rootReducer = combineReducers({
    userModule: userReducer,
    roomModule: roomReducer,
    loaderModule: loaderReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    // console.log('**** Store state changed: ****')
    // console.log('storeState:\n', store.getState())
    // console.log('*******************************')
})



