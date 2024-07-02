import { Link } from "react-router-dom"


const Sidebar: React.FC = () => {
    return(
    <div className="">
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/genres">Genres</Link></li>
            <li><Link to="/cast">Cast</Link></li>
        </ul>
    </div>
    )
}

export default Sidebar;