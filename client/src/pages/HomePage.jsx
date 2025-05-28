import {useState,useEffect} from "react"
import LayoutTemp from '../components/layout/LayoutTemp';
import { useAuth } from "../context/Auth.jsx"; // 
import toast from "react-hot-toast";
import {Checkbox,Radio} from "antd"
import { Prices } from "../components/Prices.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.jsx";
import FeaturedProduct from './../components/Home/FeaturedProduct.jsx';
import NewCollection from "./../components/Home/NewCollection.jsx"
const HomePage = () => {
  const {cart,setCart} = useCart()
  const { auth, setAuth } = useAuth();
  const [product,setProduct] = useState([]);
  const [categories,setCategories] = useState([]) 
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
 <FeaturedProduct/>
 <NewCollection/>
</LayoutTemp>
      )
};

export default HomePage;
