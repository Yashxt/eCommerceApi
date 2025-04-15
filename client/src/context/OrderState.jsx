import { useState,useEffect,createContext,useContext } from "react";
import PropTypes from "prop-types"; // ✅ For prop validation
const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  
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
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// ✅ Prop validation (optional but good practice)
OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default  OrderProvider;
export const useOrder = () => useContext(OrderContext);

