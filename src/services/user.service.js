// import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, where } from "@firebase/firestore"
import db, { auth } from "./firebase"
import CryptoJS from "crypto-js"
import { store } from "./store"
import { SET_USER } from "./user.reducer"

// const Cryptr = require('cryptr')
// const bcrypt = require('bcrypt')
// const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')
// var cookie = require('cookie');


const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const SECRET_PASS = 'XkhZG4fW2t2W'


export const userService = {
    login,
    logout,
    // signup,
    getLoggedinUser,
    saveLocalUser,
    getById
    // validateToken,
    // getLoginToken
    // getUsers,
    // getById,
    // remove,
    // update,
    // changeScore
}


// function getUsers() {
//     return storageService.query('user')
//     // return httpService.get(`user`)
// }



// async function getById(userId) {
//     const user = await storageService.get('user', userId)
//     // const user = await httpService.get(`user/${userId}`)
//     return user
// }

// function remove(userId) {
//     return storageService.remove('user', userId)
//     // return httpService.delete(`user/${userId}`)
// }

// async function update({_id, score}) {
//     const user = await storageService.get('user', _id)
//     user.score = score
//     await storageService.put('user', user)

//     // const user = await httpService.put(`user/${_id}`, {_id, score})
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user
// }

async function login(userCred) {

    // If user doesnt exist login first
    // if(!userCred.email && !userCred.password) return

    if (userCred.email) {
        // New user
        userCred.password = userCred.email
    }
    // else {
    // Existing user - 
    // TODO: decrypt password from session storage
    // userCred.password = encrypt(userCred.password)
    // console.log('userCred.password:', userCred.password)
    // userCred.password = _decryptData(userCred.password)

    // }

    // console.log('userCred:', userCred)
    const usersCol = query(collection(db, 'users'), where("name", "==", userCred.displayName || userCred.name), where('password', '==', userCred.password))
    // const usersSnapshot = await getDocs(usersCol)
    
    // TODO : UNSUB ???? I THINK  NOT
    onSnapshot(usersCol, async (users) => {
        let signedInUser
        let userFromDB = users.docs[0]
        // console.log('usersCol:', usersSnapshot.docs)
        // let user

        if (!users.docs.length) {
            // Signup
            signedInUser = await signup(userCred)

        } else {
            // signin
            signedInUser = signin(userFromDB)
        }
        //     const user = {
        //         id: userFromDB.id,
        //         name: userFromDB.data().name,
        //         password: userFromDB.data().password,
        //         imgURL: userFromDB.data().imgURL
        //         // id: usersSnapshot.docs[0].id,
        //         // name: usersSnapshot.docs[0].data().name,
        //         // password: usersSnapshot.docs[0].data().password,
        //         // imgURL: usersSnapshot.docs[0].data().imgURL
        //     }
        //     return saveLocalUser(user)
        // }
        // if (usersSnapshot.docs.length) {

        // login

        // } else {

        // }
        // console.log('user1:', user)
        // Update cookie
        // clearCookie('loginToken')
        // const loginToken = getLoginToken(user)
        // console.log('loginToken:', loginToken)
        // saveLocalUser(loginToken)
        // return user

        store.dispatch({
            type: SET_USER,
            user: signedInUser
        })
    })
    // console.log('signedInUser:', signedInUser)
    // return signedInUser

    // unsub.current = onSnapshot(roomsCol, rooms => {
    //     // console.log('rooms:', rooms)
    //     if (rooms.docs.length) navigate(`/rooms/${rooms.docs[0].id}`);
    //     const roomsWithData = rooms.docs.map(doc =>
    //         ({
    //             id: doc.id,
    //             data: doc.data()
    //         }))
    //     setRooms(rooms.docs.length ? roomsWithData : [])
    // })
    // const users = await storageService.query('user')


    // const user = users.find(user => user.username === userCred.username)
    // // const user = await httpService.post('auth/login', userCred)
    // if (user) {
    //     // socketService.login(user._id)
    //     return saveLocalUser(user)
    // }
}

function signin(userFromDB) {
    const user = {
        id: userFromDB.id,
        name: userFromDB.data().name,
        password: userFromDB.data().password,
        imgURL: userFromDB.data().imgURL
        // id: usersSnapshot.docs[0].id,
        // name: usersSnapshot.docs[0].data().name,
        // password: usersSnapshot.docs[0].data().password,
        // imgURL: usersSnapshot.docs[0].data().imgURL
    }
    return saveLocalUser(user)
}
async function signup(userCred) {
    const userToSave = {
        name: userCred.displayName,
        password: userCred.password,
        imgURL: userCred.photoURL
    }
    const userFromDB = await addDoc(collection(db, 'users'), userToSave)
    return signin(userFromDB)
}
function logout() {
    sessionStorage.clear()
}

async function getById(id){
    const userCol = doc(db, 'users', id)
    return await getDoc(userCol)
    
}
// function buildUserPresence() {
//     // Fetch the current user's ID from Firebase Authentication.
//     var uid = auth().currentUser.uid;

//     // Create a reference to this user's specific status node.
//     // This is where we will store data about being online/offline.
//     var userStatusDatabaseRef = db().ref('/status/' + uid);

//     // We'll create two constants which we will write to 
//     // the Realtime database when this device is offline
//     // or online.
//     var isOfflineForDatabase = {
//         state: 'offline',
//         last_changed: firebase.database.ServerValue.TIMESTAMP,
//     };

//     var isOnlineForDatabase = {
//         state: 'online',
//         last_changed: firebase.database.ServerValue.TIMESTAMP,
//     };

//     // Create a reference to the special '.info/connected' path in 
//     // Realtime Database. This path returns `true` when connected
//     // and `false` when disconnected.
//     db().ref('.info/connected').on('value', function (snapshot) {
//         // If we're not currently connected, don't do anything.
//         if (snapshot.val() == false) {
//             return;
//         };

//         // If we are currently connected, then use the 'onDisconnect()' 
//         // method to add a set which will only trigger once this 
//         // client has disconnected by closing the app, 
//         // losing internet, or any other means.
//         userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
//             // The promise returned from .onDisconnect().set() will
//             // resolve as soon as the server acknowledges the onDisconnect() 
//             // request, NOT once we've actually disconnected:
//             // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

//             // We can now safely set ourselves as 'online' knowing that the
//             // server will mark us as offline once we lose connection.
//             userStatusDatabaseRef.set(isOnlineForDatabase);
//         });
//     });



//     // ...
//     var userStatusFirestoreRef = db().doc('/status/' + uid);

//     // Firestore uses a different server timestamp value, so we'll 
//     // create two more constants for Firestore state.
//     var isOfflineForFirestore = {
//         state: 'offline',
//         last_changed: serverTimestamp(),
//     };

//     var isOnlineForFirestore = {
//         state: 'online',
//         last_changed: serverTimestamp(),
//     };

//     db().ref('.info/connected').on('value', function (snapshot) {
//         if (snapshot.val() == false) {
//             // Instead of simply returning, we'll also set Firestore's state
//             // to 'offline'. This ensures that our Firestore cache is aware
//             // of the switch to 'offline.'
//             userStatusFirestoreRef.set(isOfflineForFirestore);
//             return;
//         };

//         userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
//             userStatusDatabaseRef.set(isOnlineForDatabase);

//             // We'll also add Firestore set here for when we come online.
//             userStatusFirestoreRef.set(isOnlineForFirestore);
//         });
//     });



//     userStatusFirestoreRef.onSnapshot(function (doc) {
//         var isOnline = doc.data().state == 'online';
//         // ... use isOnline
//     });




//     const functions = require('firebase-functions');
//     const admin = require('firebase-admin');
//     admin.initializeApp();

//     // Since this code will be running in the Cloud Functions environment
//     // we call initialize Firestore without any arguments because it
//     // detects authentication from the environment.
//     const firestore = admin.firestore();

//     // Create a new function which is triggered on changes to /status/{uid}
//     // Note: This is a Realtime Database trigger, *not* Firestore.
//     exports.onUserStatusChanged = functions.database.ref('/status/{uid}').onUpdate(
//         async (change, context) => {
//             // Get the data written to Realtime Database
//             const eventStatus = change.after.val();

//             // Then use other event data to create a reference to the
//             // corresponding Firestore document.
//             const userStatusFirestoreRef = doc(`status/${context.params.uid}`);

//             // It is likely that the Realtime Database change that triggered
//             // this event has already been overwritten by a fast change in
//             // online / offline status, so we'll re-read the current data
//             // and compare the timestamps.
//             const statusSnapshot = await change.after.ref.once('value');
//             const status = statusSnapshot.val();
//             functions.logger.log(status, eventStatus);
//             // If the current timestamp for this data is newer than
//             // the data that triggered this event, we exit this function.
//             if (status.last_changed > eventStatus.last_changed) {
//                 return null;
//             }

//             // Otherwise, we convert the last_changed field to a Date
//             eventStatus.last_changed = new Date(eventStatus.last_changed);

//             // ... and write it to Firestore.
//             return userStatusFirestoreRef.set(eventStatus);
//         });




//     // // Below is an example of monitoring for any users who come online or go offline using a where() query.
//     // firebase.firestore().collection('status')
//     // .where('state', '==', 'online')
//     // .onSnapshot(function(snapshot) {
//     //     snapshot.docChanges().forEach(function(change) {
//     //         if (change.type === 'added') {
//     //             var msg = 'User ' + change.doc.id + ' is online.';
//     //             console.log(msg);
//     //             // ...
//     //         }
//     //         if (change.type === 'removed') {
//     //             var msg = 'User ' + change.doc.id + ' is offline.';
//     //             console.log(msg);
//     //             // ...
//     //         }
//     //     });
//     // });

// }

// async function signup(userCred) {
//     userCred.score = 10000
//     if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
//     const user = await storageService.post('user', userCred)
//     // const user = await httpService.post('auth/signup', userCred)
//     // socketService.login(user._id)
//     return saveLocalUser(user)
// }
// async function logout() {
//     sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
//     // socketService.logout()
//     // return await httpService.post('auth/logout')
// }

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }


function saveLocalUser(user) {
    // console.log('here:', user)

    // Encrypt password
    user.password = _encryptData(user.password)

    user = { id: user.id, name: user.name, password: user.password, imgURL: user.imgURL }
    // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, logintoken)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    if (!user) return null
    // Decrypt password
    user.password = _decryptData(user.password)
    // user.password = decrypt(user.password)
    // Check if user exists in DB before returning
    const usersCol = query(collection(db, 'users'), where("name", "==", user.name), where('password', '==', user.password))
    const usersSnapshot = await getDocs(usersCol)

    if (usersSnapshot.docs.length) return user
    else return null
}


// // ;(async ()=>{
// //     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
// //     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
// //     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// // })()

// function getLoginToken(user) {
//     const userInfo = { fullname: user.fullname, imgUrl: user.imgURL }
//     return cryptr.encrypt(JSON.stringify(userInfo))
// }

// function validateToken(loginToken) {
//     try {
//         const json = cryptr.decrypt(loginToken)
//         const loggedinUser = JSON.parse(json)
//         return loggedinUser
//     } catch (err) {
//         console.log('Invalid login token')
//     }
//     return null
// }

function _encryptData(txt) {
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(txt),
        SECRET_PASS
    ).toString()
    //   console.log('encrypted data:', data)
    return data
}

function _decryptData(txt) {
    const bytes = CryptoJS.AES.decrypt(txt, SECRET_PASS)
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    // console.log('decrypted data:', data)
    return data
}



