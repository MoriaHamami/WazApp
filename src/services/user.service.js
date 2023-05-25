// import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore"
import db from "./firebase"
import CryptoJS from "crypto-js"

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

    if(userCred.email) {
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
    const usersSnapshot = await getDocs(usersCol)

    // console.log('usersCol:', usersSnapshot.docs)
    let user
    if (usersSnapshot.docs.length) {
        user = {
            id: usersSnapshot.docs[0].id, 
            name: usersSnapshot.docs[0].data().name,
            password: usersSnapshot.docs[0].data().password,
            imgURL: usersSnapshot.docs[0].data().imgURL
        }
    } else {
        // Signup

        user = {
            id: userCred.id,
            name: userCred.displayName,
            password: userCred.password,
            imgURL: userCred.photoURL
        }
        await addDoc(collection(db, 'users'), user)
    }
    // console.log('user1:', user)
    // Update cookie
    // clearCookie('loginToken')
    // const loginToken = getLoginToken(user)
    // console.log('loginToken:', loginToken)
    // saveLocalUser(loginToken)
    // return user
    return saveLocalUser(user)

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

function logout(){
    sessionStorage.clear()
}
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
    // TODO: Encrypt password
    user.password = _encryptData(user.password)
    
    user = { id: user.id, name: user.name , password: user.password , imgURL: user.imgURL  }
    // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, logintoken)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    if(!user) return null
    // TODO: Decrypt password
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
  console.log('encrypted data:', data)
  return data
}

function _decryptData(txt) {
    const bytes = CryptoJS.AES.decrypt(txt, SECRET_PASS)
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    console.log('decrypted data:', data)
    return data
  }

  

