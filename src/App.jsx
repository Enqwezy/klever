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
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />

        {/* красота */}
        <Route path="/beauty" element={<Services service_name="beauty" />} />
        <Route path="/beauty/all" element={<ServicesList service_name="beauty" />} />
        <Route path="/beauty/:id" element={<ServicePage service_name="beauty" />} />

        {/* клининг */}
        <Route path="/cleaning" element={<Services service_name="cleaning" />} />
        <Route path="/cleaning/all" element={<ServicesList service_name="cleaning" />} />
        <Route path="/cleaning/:id" element={<ServicePage service_name="cleaning"   />} />

        {/* tutoring */}
        <Route path="/tutoring" element={<Services service_name="tutoring" />} />
        <Route path="/tutoring/all" element={<ServicesList service_name="tutoring" />} />
        <Route path="/tutoring/:id" element={<ServicePage service_name="tutoring" />} />

        {/* строительство */}
        <Route path="/building" element={<Services service_name="building" />} />
        <Route path="/building/all" element={<ServicesList service_name="building" />} />
        <Route path="/building/:id" element={<ServicePage service_name="building" />} />

        {/* медицина */}
        <Route path="/med_service" element={<Services service_name="med_service" />} />
        <Route path="/med_service/all" element={<ServicesList service_name="med_service" />} />
        <Route path="/med_service/:id" element={<ServicePage service_name="med_service" />} />




      </Routes> 
    </div>
  );
}
export default App;