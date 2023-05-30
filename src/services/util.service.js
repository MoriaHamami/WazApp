export const utilService = {
    getAllSubstrings
}

// Function to print all sub strings
function getAllSubstrings(str) {
    let capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1)
    let lowercaseStr = str.toLowerCase()

    let substrings = []
    // Pick starting point
    for (let startIdx = 0; startIdx < lowercaseStr.length; startIdx++) {
        // Pick ending point
        for (let endIdx = startIdx + 1; endIdx <= lowercaseStr.length - startIdx; endIdx++) {
            substrings.push(lowercaseStr.substring(startIdx, endIdx));
        }
    }

    // Add capitalized option
    for (let i = 1; i < capitalizedStr.length - 1; i++) {
        substrings.push(capitalizedStr.substring(0, i))
    }

    return substrings
}

