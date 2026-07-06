const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-semibold text-slate-700">NotesAI</p>
          <p className="mt-1">
            Built with ❤️ by{" "}
            <a
              href="https://github.com/rudraranjan001"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-teal-700 hover:text-teal-800"
            >
              Rudra
            </a>
          </p>
        </div>
        <p>Built for focused revision and smarter study sessions.</p>
      </div>
    </footer>
    
  );
};

export default Footer;
