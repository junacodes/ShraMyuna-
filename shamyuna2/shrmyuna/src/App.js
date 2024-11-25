import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import NavbarComponents from './Components/NavbarComponents';
import HomeComponents from './Components/HomeComponents';
import LoginComponents from './Components/Register/LoginComponents';
import SignUpForm from './Components/Register/SignupComponents';
import ProductComponent from './Components/Product/ProductListComponents';
import GalleryComponents from './Components/Gallery/GalleryComponents';
import AddProductComponents from './Components/Product/AddProductComponents';
import ContactUsComponent from './Components/ContactUs/ContactUsComponent';
import Cart from './Components/Product/Cartout';

import ForgotPassword from './Components/Register/ForgetPass';
import LogoutButton from './Components/Register/LogOutComponentes';
import ProfilePage from './Components/Register/ProfileComponents';



function App() {
  return (
   
      <Router>
        <NavbarComponents />
        <Routes>
          <Route path='/' element={<HomeComponents />} />
          <Route path='/login' element={<LoginComponents />} />
          <Route path='/signUp' element={<SignUpForm />} />
          <Route path='/gallery' element={<GalleryComponents />} />
          <Route path='/addproduct' element={<AddProductComponents />} />
          <Route path='/contact' element={<ContactUsComponent />} />
         <Route path ='/cart' element ={<Cart />} />
         <Route path ='/profile' element={<ProfilePage />} />
          <Route path='/sale' element={<ProductComponent />}/>
          <Route path='/forgot' element={<ForgotPassword />} /> 
          <Route path='/logout' element={<LogoutButton />}/>
    
          
          
        </Routes>
             </Router>
  
  );
}

export default App;
