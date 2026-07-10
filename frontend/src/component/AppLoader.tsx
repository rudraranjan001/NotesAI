type AppLoaderProps = {
  message?: string;
};

function AppLoader({ message = "Preparing your study space" }: AppLoaderProps) {
  return (
    <main className="app-loader" aria-live="polite" aria-busy="true">
      <div className="app-loader__orb" />
      <div className="app-loader__content">
        <p className="app-loader__eyebrow">NotesAI</p>
        <h1 className="app-loader__title">{message}</h1>
        <div className="app-loader__bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </main>
  );
}

export default AppLoader;
