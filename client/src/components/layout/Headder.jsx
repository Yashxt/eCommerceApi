import { NavLink,Link } from "react-router-dom"
import { TiShoppingCart } from "react-icons/ti";
import {useAuth} from "../../context/Auth.jsx"; 
import { useCart } from "../../context/cart.jsx";
import {Badge} from "antd"
import toast from "react-hot-toast"
import SearchInput from './../Form/SearchInput';
const Headder = () => {
  const {auth,setAuth} = useAuth();
  const {cart,setCart} = useCart();
  const handleLogout = ()=>{
   setAuth({
    ...auth,
    user:null,
    token:"",
   });
   localStorage.removeItem("auth");
   toast.success("Logout Succesfully");
  }
  return (
    <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/"className="navbar-brand" ><TiShoppingCart/>&nbsp;Ecommerce App</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink to="/"  className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/category"  className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} >Category</NavLink>
        </li>
        {
  !auth.user? (
  <> <li className="nav-item">
    <NavLink to="/register"  className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Register</NavLink>
    </li>
    <li className="nav-item">
    <NavLink to="/login"  className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} >Login</NavLink>
    </li></>)   : (  <>   
      <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink to = {`/dashboard/${auth?.user?.role ===  1 ?"admin":"user"}`}    className={({ isActive }) => isActive ? "dropdown-item active-link" : "dropdown-item"}>dashboard</NavLink>
    </li>
<li className="nav-item">
    <NavLink to="/login" className="dropdown-item" onClick ={handleLogout} >Logout</NavLink>
    </li> 
  </ul>
</li>

     </>)
}
        <li className="nav-item">
        <Badge count={cart?.length} showZero>
          <NavLink to="/cart"  className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} >Cart 
          </NavLink>
         </Badge>
         </li>
      </ul>
     
    </div>
  </div>
</nav>

        </>
  )
}


export default Headder
