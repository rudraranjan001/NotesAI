import { BrowserRouter,Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import NotesPage from "./pages/NotesPage"
import LoginPage from "./pages/LoginPage"
import NoteDetailPage from "./pages/NoteDetailPage"
import Navbar from "./component/Navbar"
import ProtectedRoute from "./component/ProtectedRoute"
import GeneratePage from "./pages/GeneratePage"

function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
       <Routes>
          <Route path = "/" element = {<HomePage />} />
          <Route path = "/dashboard" element = {<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path = "/notes" element = {<ProtectedRoute><NotesPage /></ProtectedRoute>} />
          <Route path = "/notes/:id" element = {<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
          <Route path = "/login" element = {<LoginPage />} />
          <Route path="/generate" element={ <ProtectedRoute> <GeneratePage /></ProtectedRoute> } />
       </Routes>
    </BrowserRouter>
  )
}

export default App
