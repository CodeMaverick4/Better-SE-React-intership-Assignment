import './App.css'
import LoginForm from './components/loginForm'
import { Route, Routes } from 'react-router-dom'
import SignupForm from './components/signUpForm'
import HomePage from './components/homePage'

function App() {

  return (
    <Routes >
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/signup' element={<SignupForm/>}/>        
      <Route path='/home' element={<HomePage/>}/>        
    </Routes>
    
  )
}

export default App
