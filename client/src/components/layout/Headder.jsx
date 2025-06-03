import { useState } from "react";
import { Link, NavLink } from "react-router-dom"; // Keep NavLink if needed elsewhere
import { useAuth } from "../../context/Auth.jsx";
import { useCart } from "../../context/cart.jsx";
import { useSearch } from "../../context/Search.jsx";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd"; // Keep Ant Design Badge if still intended for cart count
import toast from "react-hot-toast"; // Keep toast if you are using it

// --- Icon Components (unchanged, as these are custom SVGs or from a different library) ---
// Note: For a true Bootstrap feel, you might consider using Bootstrap Icons or Font Awesome.
// I've added some basic Bootstrap utility classes to them for sizing/alignment.

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="d-inline-block align-text-top" style={{ width: '1.5rem', height: '1.5rem' }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="d-inline-block align-text-top" style={{ width: '1.5rem', height: '1.5rem' }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.117 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.117 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="d-inline-block align-text-top text-secondary" style={{ width: '1.25rem', height: '1.25rem' }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="d-inline-block align-text-top me-1" style={{ width: '1.5rem', height: '1.5rem' }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

// --- End Icon Components ---

const Header = () => { // Renamed from Headder for conventional spelling
  const {values,setValues} = useSearch();
  const { auth, setAuth } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

      const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:9090/api/v1/product/search/${values.keyword}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
                 
              const data = await response.json();
           
              setValues({ ...values, result: data.result  });
              navigate("/search");
         }
        catch(error){
            console.log(error);
        }
    }
  return (
    // Bootstrap Navbar component
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid"> {/* Use container-fluid for full width, or container for fixed width */}

        {/* Logo/Brand */}
        <Link className="navbar-brand me-4" to="/"> {/* me-4 for margin-right */}
          <div className="bg-secondary bg-opacity-25 text-secondary p-2 rounded" style={{ minWidth: '96px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Image
          </div>
        </Link>

        {/* Search Bar - Flex-grow to occupy available space */}
        <div className="d-flex flex-grow-1 justify-content-center me-lg-auto ms-lg-auto"> {/* Adjust margins for larger screens */}
          {/* Using a form for semantic correctness in a search context */}
          <form className="d-flex w-100 me-2" role="search" onSubmit= {handleSubmit}> {/* w-100 to take full width of its parent */}
            <div className="input-group"> {/* Bootstrap input group for prepending/appending icons/text */}
              <span className="input-group-text bg-white border-end-0" id="search-addon">
                <SearchIcon />
              </span>
              <input
                type="search"
                className="form-control border-start-0" // Remove border from start for seamless look
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="search-addon"
                value={values.keyword}
                onChange={(e) => setValues({...values,keyword:e.target.value})}
              />
            </div>
          </form>
        </div>

        {/* Right side actions - d-flex for horizontal alignment */}
        <div className="d-flex align-items-center">
    { auth?.user?.role == 0 &&(<button
  type="button"
  className="btn btn-dark btn-sm me-2 d-none d-lg-block"
 >
   <Link to="/adminregister" state={{ role: 1 }} className="text-white text-decoration-none">
    BECOME A SELLER
  </Link>
  </button>)}
          <button
            type="button"
            className="btn btn-link text-dark p-1 me-2" // btn-link for button that looks like a link, text-dark for color
            aria-label="Wishlist"
          >
            <HeartIcon />
          </button>
          {/* Link to cart for navigation, combined with Ant Design Badge */}
          <Link to="/cart" className="btn btn-link text-dark p-1 position-relative me-2" aria-label="Shopping Cart">
            <Badge count={cart?.length || 0} showZero offset={[0, 0]}>
               <ShoppingBagIcon />
            </Badge>
          </Link>

          {/* Authentication Links */}
          {!auth.user ? (
            <>
              <Link to="/register" className="btn btn-link text-dark me-2">Register</Link>
              <Link to="/login" className="btn btn-link text-dark">Login</Link>
            </>
          ) : (
            // Bootstrap Dropdown for authenticated user
            <div className="dropdown">
              <button
                className="btn btn-link text-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton1" // Unique ID for dropdown
                data-bs-toggle="dropdown" // Bootstrap data attribute for dropdown
                aria-expanded="false"
              >
            <UserIcon/>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1"> {/* dropdown-menu-end aligns menu to the right */}
                <li>
                  <Link 
                    className="dropdown-item"
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;