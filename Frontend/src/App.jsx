import React from 'react'
import { BrowserRouter, Route , Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Success from './pages/Success'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useAuthContext } from './hooks/useAuthContext'
const App = () => {
  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>} />
        <Route path="/success" element={<ProtectedRoutes element={<Success />}/>} />
        <Route path="/*" element={<Error />} />
        <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App