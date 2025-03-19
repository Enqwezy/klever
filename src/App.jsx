import { Routes, Route } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Services from './components/pages/Services';


function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/beauty" element={<Services />} />
      </Routes> 
    </div>
  );
}
export default App;