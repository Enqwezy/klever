import { Routes, Route } from 'react-router-dom';

// основные страницы
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import AboutUs from './components/pages/AboutUs';

// услуги страницы
import Home from './components/pages/services/Home';
import Services from './components/pages/services/Services';
import ServicesList from './components/pages/services/ServicesList';
import ServicePage from './components/pages/services/ServicePage';
import Favorites from './components/pages/services/Favorites';
import HomeRestaurant from './components/pages/restaurant/HomeRestaurant';
import RestaurantsList from './components/pages/restaurant/RestaurantList';




function App() {
    return (
        <div >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<Favorites />} />


                {/* красота */}
                <Route path="/beauty" element={<Services service_name="beauty" />} />
                <Route path="/beauty/all" element={<ServicesList service_name="beauty" />} />
                <Route path="/beauty/:id" element={<ServicePage service_name="beauty" />} />

                {/* клининг */}
                <Route path="/cleaning" element={<Services service_name="cleaning" />} />
                <Route path="/cleaning/all" element={<ServicesList service_name="cleaning" />} />
                <Route path="/cleaning/:id" element={<ServicePage service_name="cleaning" />} />

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

                <Route path="/:id" element={<ServicePage />} />



                <Route path='/restaurant' element={<HomeRestaurant service_name='home_page_restaurant' />} />
                <Route path='/restaurant/list' element={<RestaurantsList service_name='list_page_restaurant' />} />




            </Routes>
        </div>
    );
}
export default App;