import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const {user , loginWithGoogle} = useAuth();

  if(user){
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <>
      <h1>Get Started</h1>
      <button onClick={loginWithGoogle}>Continue with Google</button>
    </>
  )
}

export default LoginPage;