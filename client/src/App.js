
import './App.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Pages/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter >
   <Navbar/>
   <Routes>
    <Route path='/' exact element={<Home/>}/>
    <Route path='/login' exact element={<Login/>}/>
    <Route path='/register' exact element={<Register/>}/>
   </Routes>
 
    </BrowserRouter>
    </div>
  );
}

export default App;
