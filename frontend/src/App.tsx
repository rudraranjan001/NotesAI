import { useEffect, useState } from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import NotesPage from "./pages/NotesPage"
import LoginPage from "./pages/LoginPage"
import NoteDetailPage from "./pages/NoteDetailPage"
import Navbar from "./component/Navbar"
import ProtectedRoute from "./component/ProtectedRoute"
import GeneratePage from "./pages/GeneratePage"
import Footer  from "./pages/Footer"
import TargetCursor from "./cursor/TargetCursor"
import AppLoader from "./component/AppLoader"
import { useAuth } from "./context/AuthContext"

function App() {
  const { loading } = useAuth();
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIntroVisible(false);
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, []);

  if (loading || introVisible) {
    return <AppLoader />;
  }

  return (
    <BrowserRouter>
    <TargetCursor 
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
          cursorColor="#111827"
          cursorColorOnTarget="#B497CF"
        />  
      <Navbar />
       <Routes>
          <Route path = "/" element = {<HomePage />} />
          <Route path = "/dashboard" element = {<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path = "/notes" element = {<ProtectedRoute><NotesPage /></ProtectedRoute>} />
          <Route path = "/notes/:id" element = {<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
          <Route path = "/login" element = {<LoginPage />} />
          <Route path="/generate" element={ <ProtectedRoute> <GeneratePage /></ProtectedRoute> } />
       </Routes>
       <Footer />
    </BrowserRouter>
  )
}

export default App
