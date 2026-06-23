import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const {user , loginWithGoogle} = useAuth();

  if(user){
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Welcome back</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Get Started</h1>
        <p className="mt-3 text-slate-600">Sign in to generate and save your study material.</p>
        <button className="mt-6 w-full rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-700" onClick={loginWithGoogle}>
          Continue with Google
        </button>
      </section>
    </main>
  )
}

export default LoginPage;
