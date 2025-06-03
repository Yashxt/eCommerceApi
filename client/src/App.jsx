import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login"
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import ResetPassword from "./pages/Auth/ResetPassword" 
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from "./pages/Admin/CreateProduct";
import User from './pages/Admin/User';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Product from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/Category";
import CartShopping from "./pages/CartShopping";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";
import AdminRegister from "./pages/Auth/AdminRegister";
 function App(){
  return (
    <Routes>
     <Route path = "/" element = {<HomePage/>}/>
     <Route path = "/register" element = {<Register/>} />
     <Route path = "/product/:slug" element = {<ProductDetails/>} />
     <Route path = "/search" element = {<SearchPage/>} />
     <Route path = "/dashboard" element= {<PrivateRoute/>} >
     <Route path = "user" element = {<Dashboard/>}/>
     <Route path = "user/orders" element = {<Orders/>}/>
     <Route path = "user/profile" element = {<Profile/>}/>
     </Route>
     <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<User />} />
          <Route path="admin/products" element={<Product />} />
        </Route>
    < Route path = "/forget-password" element = {<ResetPassword/>} />
     <Route path = "/login" element = {<Login/>} />
     <Route path="/about" element={<About />} />  
      <Route path="/contact" element={<Contact />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/cart" element={<CartShopping />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/success" element={<Success />} />
      <Route path = '/adminregister' element={<AdminRegister/>}/>
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
}

export default App;

