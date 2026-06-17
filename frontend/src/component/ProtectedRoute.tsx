import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
    children: React.ReactNode;
}

function ProtectedRoute({ children } : ProtectedRouteProps){
    const { user, loading } = useAuth();

    if(loading){
        return <p>Checking your Session...</p>
    }
    if(!user){
        return <Navigate to="/login" replace/>
        
    }

    return children;
}

export default ProtectedRoute;