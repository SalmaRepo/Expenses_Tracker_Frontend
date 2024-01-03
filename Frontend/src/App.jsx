import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './components/landingPage/LandingPage'
import About from "./components/about/About"
import Login from "./components/login/Login"
import SignUp from './components/signUp/SignUp'
import Home from './components/home/Home'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
   <Route path="/" element={<LandingPage/>}/>
   <Route path="/about" element={<About/>}/>
   <Route path="/Login" element={<Login/>}/>
   <Route path="/SignUp" element={<SignUp/>}/>
   <Route path="/home"  element={<Home/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
