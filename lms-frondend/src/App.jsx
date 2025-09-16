import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
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
import { useEffect, useRef } from "react"
import { getUser } from "./state/Authentication/Action"
import { Navbar } from "./components/nav/Navbar"
import { Profile } from "./components/Login/Profile"
import { Dashboard } from "./Pages/Dashboard"


function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const role = auth.role || localStorage.getItem("role");
  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
  }, [auth.jwt]);
  console.log(auth)



  return (
    <>
      <main className="w-full bg-neutral-50 flex min-h-screen flex-col text-neutral-500">
        {/* Navbar section */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={role === 'ROLE_ADMIN' ? <AdminPrograms /> : <Programs />} />
          <Route path="/enrolled" element={role === 'ROLE_STUDENT' ? <Entrolled /> : <Navigate to="/" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/programs/:id" element={role === 'ROLE_ADMIN' ? <AdminProgramDetails /> : <Details />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
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
