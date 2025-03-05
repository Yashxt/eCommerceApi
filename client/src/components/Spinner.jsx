import {useState,useEffect} from 'react'
import {useNavigate,useLocation} from "react-router-dom"
import PropTypes from "prop-types";
const Spinner = ({path = "login"}) => {
    const [count,setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        if (count === 0) {
            navigate(`/${path}`,{
                state:location.pathname
            });
            return;
          } 
      
          const interval = setInterval(() => {
            setCount((prev) => prev - 1);
          }, 1000);
      
          return () => clearInterval(interval);

    },[count,navigate,location,path]);
  return (
    <>
   <div className="d-flex justify-content-center align-items-center"
   style= {{height:"100vh"}}>
    <h1 className ="Text-center">redirecting to you in {count} second</h1> 
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div> 

    </>
  )
}
Spinner.propTypes = {
  path: PropTypes.string, // Validate children as a valid React node
};
export default Spinner