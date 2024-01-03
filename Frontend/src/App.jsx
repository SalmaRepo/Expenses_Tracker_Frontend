import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './components/landingPage/LandingPage'
import About from "./components/about/About"
import Login from "./components/login/Login"
import SignUp from './components/signUp/SignUp'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
   <Route path="/" element={<LandingPage/>}/>
   <Route path="/about" element={<About/>}/>
   <Route path="/Login" element={<Login/>}/>
   <Route path="/SignUp" element={<SignUp/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
