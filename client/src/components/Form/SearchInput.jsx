import React from 'react'
import { useSearch } from '../../context/Search'
import { useNavigate } from 'react-router-dom';
const SearchInput = () => {
    const {values,setValues} = useSearch();
    const navigate = useNavigate();
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
   <div>
  <form className="d-flex" role="search" onSubmit={handleSubmit}>
    <input
      className="form-control me-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
      value={values.keyword}
      onChange={(e) => setValues({ ...values, keyword: e.target.value })}
    />
    <button className="btn btn-outline-success" type="submit">
      Search
    </button>
  </form>
</div>
  )
}

export default SearchInput