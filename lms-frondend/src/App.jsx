import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/nav/Navbar"
import Footer from "./components/footer/Footer"
import { Home } from "./Pages/Home"
import { Programs } from "./Pages/Programs"
import { Details } from "./Pages/Details"
import { Quiz } from "./Pages/Quiz"
import { Entrolled } from "./Pages/Entrolled"
import { Admin } from "./Pages/Admin"
import { useContext } from "react"
import { AppContext } from "./Contexts/AppContext"
import { AdminPrograms } from "./Pages/AdminPrograms"
import { AdminProgramDetails } from "./Pages/AdminProgramDetails"

function App() {
  const { role } = useContext(AppContext);
  return (
    <>
      <Router>
        <main className="w-full bg-neutral-50 flex min-h-screen flex-col text-neutral-500">
          {/* Navbar section */}
          <Navbar />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={role === 'admin' ? <AdminPrograms /> : <Programs />} />
            <Route path="/enrolled" element={<Entrolled />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/programs/:id" element={role === 'admin' ? <AdminProgramDetails /> : <Details />} />
            <Route path="/quiz/:id" element={<Quiz />} />
          </Routes>
          {/* Footer Section */}
          <Footer />
        </main>
      </Router>
    </>
  )
}

export default App
