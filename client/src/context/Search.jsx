import { useState,createContext,useContext } from "react";
import PropTypes from "prop-types"; // ✅ For prop validation
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
   keyword:"",
   result:[],
  });
  


  return (
    <SearchContext.Provider value={{ values, setValues }}>
      {children}
    </SearchContext.Provider>
  );
};

// ✅ Prop validation (optional but good practice)
SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default  SearchProvider;
export const useSearch = () => useContext(SearchContext);


