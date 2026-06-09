import { BrowserRouter,Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import NotesPage from "./pages/NotesPage"
import LoginPage from "./pages/LoginPage"
import NoteDetailPage from "./pages/NoteDetailPage"
import Navbar from "./component/Navbar"


function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
       <Routes>
          <Route path = "/" element = {<HomePage />} />
          <Route path = "/Dashboard" element = {<DashboardPage />} />
          <Route path = "/notes" element = {<NotesPage />} />
          <Route path = "/notes/:id" element = {<NoteDetailPage />} />
          <Route path = "/Login" element = {<LoginPage />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
