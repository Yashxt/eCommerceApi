import {useState,useEffect} from "react"
import LayoutTemp from '../components/layout/LayoutTemp';
import { useAuth } from "../context/Auth.jsx"; // 
import toast from "react-hot-toast";
import {Checkbox,Radio} from "antd"
import { Prices } from "../components/Prices.jsx";
const HomePage = () => {
  const { auth, setAuth } = useAuth();
  const [product,setProduct] = useState([]);
  const [categories,setCategories] = useState([]) 
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    try {
        const response = await fetch("http://localhost:9090/api/v1/product/product-count");
        const data = await response.json();
        setTotal(data?.total);
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    if (page === 1) return;
    loadMore();
}, [page]);

// Load more products
const loadMore = async () => {
    try {
        setLoading(true);
        const response = await fetch(`http://localhost:9090/api/v1/product/product-list/${page}`);
        const data = await response.json();
        setLoading(false);
        setProduct([...product, ...data.products]);
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
};
    //filter by cat
  const handleFilter = async(value,id)=>{
  let all = [...checked];
  if(value){
    all.push(id);
  }
  else{
   all =  all.filter(c => c!== id)
  }
  setChecked(all);
  }


  const getAllCategory = async()=>{
    try{
      const response = await fetch("http://localhost:9090/api/v1/category/get-category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const data = await response.json();
    
      if (data.success) {
        setCategories(data.category);
      }
    
    }
    catch(error){
console.log(error);
toast.error("something went wrong while getting category");
    }
  }
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:9090/api/v1/product/product-list/${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth?.token}`  
        },
      });
  
      const data = await response.json();
      setLoading(false)
      if (data?.success) {
        setProduct(data?.products);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

   const filterProduct = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/v1/product/product-filters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checked,
          radio,
        }),
      });
  
      const data = await response.json();
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length, radio.length]);
  
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);
  return (
    <LayoutTemp title={"All Products - Best Offers"} >
  <div className="row mt-3">
    <div className="col-md-2">
      <h4 className="text-center">Filter by category</h4>
      <div className="d-flex flex-column">
      {categories?.map((c)=>(

    <Checkbox key ={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>{c.name} </Checkbox>
      ))}
      </div>
      <h4 className="text-center mt-4-">Filter by price</h4>
      <div className="d-flex flex-column">
      <Radio.Group 
  onChange={(e) => {
    console.log("Selected price range:", e.target.value); // Debugging
    setRadio(e.target.value);
  }}
>
  {Prices?.map((p) => (
    <div key={p._id}>
      <Radio value={p.array}>{p.name}</Radio>
    </div>
  ))}
</Radio.Group>
      </div>
      <div className="d-flex flex-column">
      <button className="btn btn-danger" onClick={()=>{window.location.reload()}}>Reset Filters</button>
      </div>
    </div>
    <div className="col-md-9">
      <h1 className="text-center">All Products</h1>
      <div className="d-flex flex-wrap">
        {product?.map((p) => (
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
              <button className="btn btn-primary ms-1">more details </button>
              <button className="btn btn-secondary ms-1">add to cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="m-2 p-3">
            {product && product.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              > 
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
    </div>
  </div>
</LayoutTemp>
      )
};

export default HomePage;
