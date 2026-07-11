import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type AppLoaderProps = {
  message?: string;
};

function AppLoader({ message = "Preparing your study space" }: AppLoaderProps) {
  return (
    <main className="app-loader" aria-live="polite" aria-busy="true">
      <div className="app-loader__content">
        <div className="app-loader__animation" aria-hidden="true">
          <DotLottieReact src="/animations/student.lottie" loop autoplay />
        </div>
        <h1 className="app-loader__title">{message}</h1>
        <p className="app-loader__subtitle">NotesAI is getting ready...</p>
      </div>
    </main>
  );
}

export default AppLoader;
