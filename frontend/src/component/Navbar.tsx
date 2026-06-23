import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar = () =>{
    const { user, logout } = useAuth();
    return (
        <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <Link to="/" className="text-xl font-bold tracking-tight text-slate-950">
                    NotesAI
                </Link>
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">
                    <Link className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-950" to="/">Home</Link>
            {user ? (
                <>
                    <Link className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-950" to="/dashboard">Dashboard</Link>
                    <Link className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-950" to="/notes">Notes</Link>
                    <Link className="rounded-md bg-teal-600 px-3 py-2 text-white shadow-sm hover:bg-teal-700" to="/generate">Generate</Link>
                    <button className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100" onClick={logout}>Logout</button>
                </>
            ):(
                <>
                    <Link className="rounded-md bg-teal-600 px-3 py-2 text-white shadow-sm hover:bg-teal-700" to="/login">Login</Link>
                </>
            )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
