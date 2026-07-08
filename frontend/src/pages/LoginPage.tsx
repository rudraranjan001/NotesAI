import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const features = [
  {
    icon: "✦",
    title: "AI Study Notes",
    description: "Turn any topic into clean summaries, full notes, flashcards, mind maps, and comparison charts.",
  },
  {
    icon: "✓",
    title: "Saved Library",
    description: "Keep generated material in one place so revision does not start from zero every time.",
  },
  {
    icon: "↻",
    title: "Revise Faster",
    description: "Use concise formats for quick recall and detailed notes when you need deeper understanding.",
  },
];

const LoginPage = () => {
  const {user , loginWithGoogle} = useAuth();

  if(user){
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] w-full max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Start with NotesAI</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
          Start your study journey with smarter notes.
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          Generate structured learning material from any topic, save it to your library, and revise with formats that match how you study.
        </p>

        <div className="mt-7 grid gap-3 text-left">
          <div className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3">
            <p className="font-semibold text-slate-950">One topic, many formats</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">Summary, full notes, flashcards, mind map, and comparison chart.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="font-semibold text-slate-950">Built for focused revision</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">Save your generated notes and return to them whenever you need.</p>
          </div>
        </div>

        <button
          className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto sm:min-w-72"
          onClick={loginWithGoogle}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-600">G</span>
          Continue with Google
        </button>
        <p className="mt-4 text-sm text-slate-500">Secure sign-in. Your notes stay connected to your account.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl sm:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">NotesAI</p>
          <h2 className="mt-3 text-2xl font-bold">AI-powered notes for faster learning.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Create exam-ready study material in seconds, then organize the best outputs in your saved notes.
          </p>
        </div>

        {features.map((feature) => (
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" key={feature.title}>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-xl font-bold text-teal-700">
              {feature.icon}
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-950">{feature.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default LoginPage;
