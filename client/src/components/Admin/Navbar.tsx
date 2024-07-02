import { logout } from "../../services/auth.service";

const Navbar: React.FC = () => {
    return (
        <nav className="flex space-between">
            <h1>Admin Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </nav>
    )
}

export default Navbar;