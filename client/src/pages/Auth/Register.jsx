import { useState } from "react";
import LayoutTemp from '../../components/layout/LayoutTemp';
import {useNavigate} from "react-router-dom" //ahook to navigate 
import toast from "react-hot-toast";
import "../../styles/authstyle.css";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
 /*=========form function ========*/
 const handleSubmit = async(e)=>{
   e.preventDefault();
   console.log("handle submit triggered")
   if (!name || !email || !password || !phone || !address) {
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
    const res = await fetch('http://localhost:9090/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, phone, address,answer })
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
        <LayoutTemp title={"register -Ecommerce app"}>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 

                        />
                    </div>
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
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Phone No"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} 
                            required
                        />
                    </div>
                      <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} 
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="What is your favourite sports"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)} 
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </LayoutTemp>
    );
}

export default Register;
