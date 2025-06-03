import { useState } from "react";
import LayoutTemp from '../../components/layout/LayoutTemp';
import {useNavigate,useLocation} from "react-router-dom" //ahook to navigate 
import toast from "react-hot-toast"
import "../../styles/authstyle.css"
import {useAuth} from "../../context/Auth"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const{auth,setAuth} =useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
 /*=========form function ========*/
 const handleSubmit = async(e)=>{
   e.preventDefault();
   console.log("handle submit triggered")
   if ( !email || !password ) {
    toast.error("Please fill in all fields.");
    return;
}
if (!validateEmail(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return;
  }

  try {
    const res = await fetch('http://localhost:9090/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password })
    });

    const data = await res.json();


    if (data.success) {
        toast.success(data.message);
        setAuth({
            ...auth,
            user:data.user,
            token:data.token,
        });
            localStorage.setItem("auth", JSON.stringify({user:data.user,token:data.token}));
            navigate(location.state ||"/");
        
        
        
    } else {
        toast.error(data.message || "Something went wrong");
    }
} catch (error) {
    console.log(error);
    toast.error("Something went wrong");
}

 }
    return (
        <LayoutTemp title={"register -Ecommerce app"}>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                   
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                     <div className = "mb-3">
                     <button type="submit" className="btn btn-primary">
                        Login
                    </button></div>
                    <button type="submit" className="btn btn-primary" onClick = {()=>navigate("/forget-password")}>
                        forgot password
                    </button>
                </form>
            </div>
        </LayoutTemp>
    );
} 

export default Login;
