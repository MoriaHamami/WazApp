import { Link } from "react-router-dom"

function HomePage() {
    return (
        <article className="home-page">
            <h1>hihihi</h1>
            <Link to="rooms">
                <h1>To whatsapp</h1>
            </Link>
        </article>
    )
}

export default HomePage