import LayoutTemp from '../components/layout/LayoutTemp';
 import { useSearch } from '../context/Search';
 import { useNavigate } from 'react-router-dom';
const SearchPage = () => {
  const{values,setValues} = useSearch();
  const navigate =  useNavigate();
  return (
    <LayoutTemp title = {'search results'}> 
   <div className="container">
      <div className="text-center">
      <h6>search result</h6>
          <h6>
            {values?.result.length < 1
              ? "No Products Found"
              : `Found ${values?.result.length}`}
          </h6>
          <div className="d-flex flex-wrap">
        {values?.result.map((p) => (
          <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
            <img
              src={`http://localhost:9090/api/v1/product/product-photo/${p._id}`}
              className="card-img-top"
              alt={p.name}
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description.substring(0,30)}</p>
              <p className="card-text"> ${p.price}</p>
              <button className="btn btn-primary ms-1"  onClick={()=>{navigate(`/product/${p.slug}`)}}>more details </button>
              <button className="btn btn-secondary ms-1">add to cart</button>
            </div>
          </div>
        ))}
      </div>
      </div>
   </div>
    </LayoutTemp>
  )
}

export default SearchPage