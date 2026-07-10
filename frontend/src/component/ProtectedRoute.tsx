import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLoader from "./AppLoader";

type ProtectedRouteProps = {
    children: React.ReactNode;
}

function ProtectedRoute({ children } : ProtectedRouteProps){
    const { user, loading } = useAuth();

    if(loading){
        return <AppLoader message="Checking your session" />
    }
    if(!user){
        return <Navigate to="/login" replace/>
        
    }

    return children;
}

export default ProtectedRoute;
