import React,{useState}from 'react'
import LayoutTemp from '../../components/layout/LayoutTemp'
import {useNavigate} from "react-router-dom" //ahook to navigate 
import toast from "react-hot-toast"
import "../../styles/authstyle.css"
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const[answer,setAnswer] =useState();
  const navigate = useNavigate();
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
/*=========form function ========*/
const handleSubmit = async(e)=>{
 e.preventDefault();
 console.log("handle submit triggered")
 if ( !email || !newPassword ) {
  toast.error("Please fill in all fields.");
  return;
}
if (!validateEmail(email)) {
  toast.error("Please enter a valid email address.");
  return;
}

if (newPassword.length < 6) {
  toast.error("Password must be at least 6 characters long.");
  return;
}

try {
  const res = await fetch('http://localhost:9090/api/v1/auth/forgot-password', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({email,answer, newPassword })
  });

  const data = await res.json();


  if (data.success) {
      toast.success(data.message);
          navigate("/login");
  } else {
      toast.error(data.message || "Something went wrong");
  }
} catch (error) {
  console.log(error);
  toast.error("Something went wrong");
}

}
 
  return (
    <LayoutTemp title = "Forgot Password - Ecommerce App" >
       <div className="form-container">
                <h1>Reset Password</h1>
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
                            placeholder="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="what's your favourite sports"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)} 
                            required
                        />
                    </div>
                     <div className = "mb-3">
                     <button type="submit" className="btn btn-primary">
                        Reset password
                    </button></div>
                </form>
            </div>
    </LayoutTemp>
  )
} 

export default ResetPassword