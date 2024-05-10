import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Soon from './pages/ComingSoon'
import Dashboard from './pages/dashboard'
import SignupPage from './pages/Signup'
import AdminLoginPage from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'


function App() {
  return(
    <>
      <div>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/adminlogin' element={<AdminLoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/facialreg' element={<Soon/>}/>
          <Route path='/schedule' element={<Soon/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/admindashboard' element={<AdminDashboard/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
