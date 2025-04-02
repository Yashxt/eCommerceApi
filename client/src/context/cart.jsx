import { useState,createContext,useContext } from "react";
import PropTypes from "prop-types"; // ✅ For prop validation
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  


  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Prop validation (optional but good practice)
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default  CartProvider;
export const useCart = () => useContext(CartContext);


