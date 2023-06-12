import { SearchOutlined } from "@mui/icons-material"
import { useEffect } from "react"

function SearchBar({ loadRooms }) {

    // useEffect(() => {
    //     return () => loadRooms(null)
    // }, [])

    function onSearchChats(ev) {
        // ev.preventDefault()y
        // console.log('here:', ev.target.value)
        loadRooms(ev.target.value)
    }

    return (
        <div className="searchbar">
            <div className="search-container">
                <SearchOutlined />
                <input placeholder="Search" onChange={onSearchChats} />
            </div>
        </div>
    )
}

export default SearchBar