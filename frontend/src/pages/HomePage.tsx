
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <section className="space-y-7">
        <div className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
          AI study material for focused revision
        </div>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Turn any topic into notes you can actually study.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Generate summaries, revision notes, flashcards, mind maps, and comparison charts, then save the best results to your library.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-700" to="/generate">
            Generate notes
          </Link>
          <Link className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100" to="/notes">
            View library
          </Link>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Preview</p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950">Photosynthesis summary</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <p><strong>Core idea:</strong> Plants convert light energy into chemical energy stored as glucose.</p>
            <p><strong>Key inputs:</strong> Sunlight, carbon dioxide, and water.</p>
            <p><strong>Exam tip:</strong> Remember chlorophyll absorbs light in chloroplasts.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage;
