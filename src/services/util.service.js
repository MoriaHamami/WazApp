export const utilService = {
    getAllSubstrings
}

// Function to print all sub strings
function getAllSubstrings(str) {
    let substrings =[]
    // Pick starting point
    for (let startIdx = 0; startIdx < str.length; startIdx++) {
        // Pick ending point
        for (let endIdx = startIdx + 1; endIdx <= str.length - startIdx; endIdx++) {
           
                substrings.push(str.substring(startIdx, endIdx));
            

        }
    }

    return substrings
}