import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/nav/Navbar"
import Footer from "./components/footer/Footer"
import { Home } from "./Pages/Home"
import { Programs } from "./Pages/Programs"
import { Details } from "./Pages/Details"
import { Quiz } from "./Pages/Quiz"
import { Entrolled } from "./Pages/Entrolled"
import { Admin } from "./Pages/Admin"
import { AdminPrograms } from "./Pages/AdminPrograms"
import { AdminProgramDetails } from "./Pages/AdminProgramDetails"
import { SignUp } from "./Pages/SignUp"
import { Login } from "./components/Login/Login"
import { useDispatch, useSelector } from "react-redux"
import { store } from "./state/store"

function App() {
  // const dispatch = useDispatch();
  // const jwt = localStorage.getItem("jwt");
  // const { auth } = useSelector((store) => store);
  const role = useSelector(state => state.auth.role) || localStorage.getItem("role");



  return (
    <>
      <main className="w-full bg-neutral-50 flex min-h-screen flex-col text-neutral-500">
        {/* Navbar section */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={role === 'ROLE_ADMIN' ? <AdminPrograms /> : <Programs />} />
          <Route path="/enrolled" element={<Entrolled />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/programs/:id" element={role === 'ROLE_ADMIN' ? <AdminProgramDetails /> : <Details />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-account' element={<SignUp />} />
        </Routes>
        {/* Footer Section */}
        <Footer />
      </main>
    </>
  )
}

export default App
