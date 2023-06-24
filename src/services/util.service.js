
export const utilService = {
    getAllSubstrings,
    getChatHeaderFormattedDate,
    getChatListFormattedDate,
    getChatFormattedDate,
    getTime,
    uploadImg
}


function uploadImg(ev, onImgReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, to render the img
        img.onload = () => onImgReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}





// Function to print all sub strings
function getAllSubstrings(str) {
    let subStrs = []
    str = str.toLowerCase()

   function recurseSubStr(startIndex, endIndex) {
      // Base case
      if (endIndex === str.length) {
         return
      }

      // Recursive case
      if (startIndex > endIndex) {
         recurseSubStr(0, endIndex + 1)
      } else {
         subStrs.push(str.slice(startIndex, endIndex + 1));
         recurseSubStr(startIndex + 1, endIndex)
      }
   }

   recurseSubStr(0, 0)
   return subStrs
}
// function getAllSubstrings(str) {
//     let capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1)
//     let lowercaseStr = str.toLowerCase()

//     let substrings = []
//     // Pick starting point
//     for (let startIdx = 0; startIdx < lowercaseStr.length; startIdx++) {
//         // Pick ending point
//         for (let endIdx = startIdx + 1; endIdx <= lowercaseStr.length; endIdx++) {
//         // for (let endIdx = startIdx + 1; endIdx <= lowercaseStr.length - startIdx; endIdx++) {
//             substrings.push(lowercaseStr.substring(startIdx, endIdx));
//         }
//     }

//     // Add capitalized option
//     for (let i = 1; i < capitalizedStr.length - 1; i++) {
//         substrings.push(capitalizedStr.substring(0, i))
//     }

//     return substrings
// }




function _isTimeNow(ts) {
    const currentTime = new Date().getTime()
    const thatTime = new Date(ts).getTime()
    const timeDiff = currentTime - thatTime
    // If the time diff is less than 3 sec, the given ts is close to now
    return timeDiff < 1000 * 3
}

function _isToday(ts) {
    const today = new Date()
    const thatDay = new Date(ts)
    return today.toDateString() === thatDay.toDateString()
}

function _isYesterday(ts) {
    const yesterday = new Date()
    const thatDay = new Date(ts)

    yesterday.setDate(yesterday.getDate() - 1)

    return yesterday.toDateString() === thatDay.toDateString()
}

function _isThisWeek(ts) {
    // MADE THIS ONE MYSELF

    // const weekAgo = new Date()
    // const thatDay = new Date(ts)

    // weekAgo.setDate(weekAgo.getDate() - 7)

    // return yesterday.toDateString() === thatDay.toDateString()
    // const today = new Date() 
    // const thatDay = new Date(ts)
    const weekAgo = new Date().setHours(0,0,0,0) - 604800000
    const thatTime = new Date(ts).setHours(0,0,0,0)


    // const weekDiff = today.getDay() - thatDay.getDay() 
    // const monthDiff = today.getMonth() - thatDay.getMonth()
    // const yearDiff = today.getFullYear() - thatDay.getFullYear()
    //     console.log('weekDiff:', weekDiff)
    // const monthDiff = _getMonthDifference(thatDay, today)
    // return weekDiff < 7
    // weekAgo.setDate(weekAgo.getDate() - 7)

    return weekAgo < thatTime

}

function _isThisYear(ts) {
    const today = new Date()
    const thatDay = new Date(ts)

    const monthDiff = today.getMonth() -
        thatDay.getMonth() +
        12 * (today.getFullYear() - thatDay.getFullYear())

    // const monthDiff = _getMonthDifference(thatDay, today)
    return monthDiff < 12
}




// function _getMonth(date) {
//     const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
//         'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ]
//     return monthNames[ts.getMonth()]
// }
// function _getWeekday(ts) {
//     date = new Date(ts)
//     return date.toLocaleString(locale, { weekday: 'short' })
// }
// function _getYear(ts) {

// }
// function _getTime(ts) {

// }


// function getDayName(date, locale) {
//     date = new Date(date)
//     return date.toLocaleString(locale, { weekday: 'short' })
// }

// function getMonthName(date) {
//     const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
//         'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ]
//     return monthNames[date.getMonth()]
// }

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

// function _isThisYear(ts) {
//     var today = new Date()
//     var thatDay = new Date(ts)

//     const monthDiff = _getMonthDifference(thatDay, today)
//     return monthDiff < 12
// }

// function _getMonthDifference(startDate, endDate) {
//     return (
//         endDate.getMonth() -
//         startDate.getMonth() +
//         12 * (endDate.getFullYear() - startDate.getFullYear())
//     )
// }
function getTime(timestamp){
    if(!timestamp?.seconds) return null
    const ms = timestamp.seconds * 1000
    timestamp = new Date(ms)
    const userLocale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language
    return timestamp.toLocaleString(userLocale, {
        hour: '2-digit',
        minute: '2-digit'
    })
}

function getChatFormattedDate(timestamp) {
    if(!timestamp?.seconds) return null
    const ms = timestamp.seconds * 1000
    // console.log('ms:', ms)
    timestamp = new Date(ms)
    let options
    if (_isToday(timestamp)) {
        return 'Today'
    } else if (_isYesterday(timestamp)) {
        return 'Yesterday'
    } else if (_isThisWeek(timestamp)) {
        options = {
            weekday: 'long'
        }
    } else if (_isThisYear(timestamp)) {
        options = {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
        }

    } else {
        options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }

    }

    const userLocale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language
    return timestamp.toLocaleString(userLocale, options)
    // if (_isThisYear(timestamp)) {
    //     // Get the date if timestamp is from this year
    //     var date = timestamp.toLocaleString('en-us', { month: 'short', day: 'numeric' })
    // } else {
    //     // Get the year if timestamp is not from this year
    //     var date = timestamp.getFullYear()
    // }
    // return date
}
function getChatListFormattedDate(timestamp) {
    // console.log('timestamp:', timestamp)
    if(!timestamp?.seconds) return ''
    const ms = timestamp.seconds * 1000
    // console.log('ms:', ms)
    timestamp = new Date(ms)
    // if (!timestamp) return ''

    const userLocale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language
    let options

    if (_isToday(timestamp)) {
        options = {
            hour: '2-digit',
            minute: '2-digit'
        }
    } else if (_isYesterday(timestamp)) {
        return 'Yesterday'
    } else if (_isThisWeek(timestamp)) {
        options = {
            weekday: 'long'
        }
    } else {
        // options = {
        //     time: false,
          
        // }
        return new Intl.DateTimeFormat(userLocale).format(timestamp)
        // return timestamp.toLocaleString(userLocale)
    }

    return timestamp.toLocaleString(userLocale, options)
    // if (_isThisYear(timestamp)) {
    //     // Get the date if timestamp is from this year
    //     var date = timestamp.toLocaleString('en-us', { month: 'short', day: 'numeric' })
    // } else {
    //     // Get the year if timestamp is not from this year
    //     var date = timestamp.getFullYear()
    // }
    // return date
}
function getChatHeaderFormattedDate(timestamp) {
    if(!timestamp?.seconds) return ''
    const ms = timestamp.seconds * 1000
    // console.log('ms:', ms)
    timestamp = new Date(ms)
    // timestamp = new Date(timestamp)
    // if (!timestamp) return ''
    const userLocale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language
    if (_isTimeNow(timestamp)) {
        return 'online'
    } else if (_isToday(timestamp)) {
        const time = timestamp.toLocaleString(userLocale, { hour: '2-digit', minute: '2-digit' })
        return 'last seen today at ' + time
    } else if (_isThisWeek(timestamp)) {
        return 'last seen ' + timestamp.toLocaleString(userLocale, { weekday: 'short', hour: "2-digit", minute: "2-digit" })
    } else {
        return 'last seen ' + timestamp.toLocaleString(userLocale, { year: 'numeric', month: 'short', day: 'numeric' })
    }


    // if (_isThisYear(timestamp)) {
    //     // Get the date if timestamp is from this year
    //     var date = timestamp.toLocaleString('en-us', { month: 'short', day: 'numeric' })
    // } else {
    //     // Get the year if timestamp is not from this year
    //     var date = timestamp.getFullYear()
    // }
    // return date
}

