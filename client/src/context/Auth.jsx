import { useState,useEffect,createContext,useContext } from "react";
import PropTypes from "prop-types"; // ✅ For prop validation
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if(data){
        const parseData = JSON.parse(data);
        setAuth({
            ...auth,
            user:parseData.user,
            token:parseData.token,
        })
    }
  },[])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Prop validation (optional but good practice)
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default  AuthProvider;
export const useAuth = () => useContext(AuthContext);


