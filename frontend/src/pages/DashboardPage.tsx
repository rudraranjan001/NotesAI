import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Dashboard</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">Ready for your next study session?</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Create AI-generated study material from any topic, save useful results, and come back later to revise.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-700" to="/generate">Generate Notes</Link>
            <Link className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100" to="/notes">View Saved Notes</Link>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["1", "Choose a topic", "Start with the chapter, concept, or exam theme you want to study."],
          ["2", "Pick a format", "Use summaries, flashcards, mind maps, or charts depending on the task."],
          ["3", "Save and revise", "Keep the useful output in your study library for later editing."],
        ].map(([step, title, text]) => (
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" key={step}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 font-bold text-teal-700">{step}</span>
            <h2 className="mt-4 text-lg font-bold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default DashboardPage;
