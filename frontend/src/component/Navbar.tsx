import { Link } from "react-router-dom";

const Navbar = () =>{
    return (
        <nav>
            <Link to="/">Home</Link><br />
            <Link to="/Dashboard">Dashboard</Link><br />
            <Link to="/notes">Notes</Link><br />
            <Link to="/notes/:id">NoteDetail</Link><br />
            <Link to="/Login">Login</Link><br />
        </nav>
    )
}

export default Navbar;