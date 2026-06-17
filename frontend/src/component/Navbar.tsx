import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar = () =>{
    const { user, logout } = useAuth();
    return (
        <nav>
            <Link to="/">Home</Link><br />
            {user ? (
                <>
                    <Link to="/dashboard">Dashboard</Link><br />
                    <Link to="/notes">Notes</Link><br />
                    <Link to="/generate">Generate</Link><br />
                    <button onClick={logout}>Logout</button>
                </>
            ):(
                <>
                    <Link to="/login">Login</Link><br />
                </>
            )}
            
            
        </nav>
    )
}

export default Navbar;