import {useState,useEffect} from "react";
import LayoutTemp from '../../components/layout/LayoutTemp';
import AdminMenu from './../../components/layout/AdminMenu';
import  toast  from 'react-hot-toast';
import { useAuth } from "../../context/Auth";
import { Link } from "react-router-dom";

const Product = () => {
    const [product,setProduct]=useState([]);
    const {auth,setAuth}= useAuth();
    //get all products
    const getAllProduct = async()=>{
    try{
        const response = await fetch("http://localhost:9090/api/v1/product/get-product", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth?.token}`
            },
          });
          
          const data = await response.json();
          setProduct(data.product);
    }
    catch(error){
        console.log(error);
        toast.error("something went wrong")
    }
    }
    
  //lifecycle method
  useEffect(() => {
    getAllProduct();
    //eslint-disable-next-line
  }, []);

  return (
    <LayoutTemp title = "admin-products">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
               <h1 className='text-center'>all product list</h1>
               <div className="d-flex">
               {product?.map(p=>(
             
             <Link
             key={p._id}
             to={`/dashboard/admin/products/${p.slug}`}
             className="product-link"
           >
             <div className="card m-2" style={{ width: "18rem" }}>
               <img
                 src={`http://localhost:9090/api/v1/product/product-photo/${p._id}`}
                 className="card-img-top"
                 alt={p.name}
               />
               <div className="card-body">
                 <h5 className="card-title">{p.name}</h5>
                 <p className="card-text">{p.description}</p>
               </div>
             </div>
           </Link>


               ))}
               </div>
            </div>
             </div>
    </LayoutTemp>
  )
}

export default Product