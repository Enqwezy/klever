import { Routes, Route } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import ServicesList from './components/pages/ServicesList';
import ServicePage from './components/pages/ServicePage';
import AboutUs from './components/pages/AboutUs';
import Profile from './components/pages/Profile';


function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/beauty" element={<Services />} />
        <Route path="/beauty/all" element={<ServicesList />} />
        <Route path="/beauty/one" element={<ServicePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />

      </Routes> 
    </div>
  );
}
export default App;