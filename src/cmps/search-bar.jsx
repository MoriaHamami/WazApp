import { SearchOutlined } from "@mui/icons-material"

function SearchBar() {
    return (
        <div className="searchbar">
            <div className="search-container">
                <SearchOutlined />
                <input placeholder="Search or start new chat" />
            </div>
        </div>
    )
}

export default SearchBar