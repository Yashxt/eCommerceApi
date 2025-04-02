import React from 'react'
import LayoutTemp from '../components/layout/LayoutTemp'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const ProductDetails = () => { 
    const params = useParams();
    const navigate = useNavigate();
    const[product,setProduct] = useState({}); 
    const [relatedProducts,setRelatedProducts] = useState([]);
    const getProduct = async( )=>{
        try{
            const response = await fetch(`http://localhost:9090/api/v1/product/get-product/${params.slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        if(params?.slug) getProduct();
    },[params?.slug])
    const getSimilarProduct = async(pid,cid)=>{
        try {
            const response = await fetch(`http://localhost:9090/api/v1/product/related-product/${pid}/${cid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log("Fetch error:", error);
        }

    }
  return (
    <LayoutTemp>
        <div className="row container">
            <div className="col-md-6">
            <img
              src={`http://localhost:9090/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="300"
              width={"350px"}
            />
            </div>
            <div className="col-md-6">
                <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
</div>
        </div>
        <div className="row container">
            <h6>similar products</h6>
            {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
            <div className="d-flex flex-wrap">
        {relatedProducts?.map((p) => (
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
              <button className="btn btn-primary ms-1" onClick={()=>{navigate(`/product/${p.slug}`)}}>more details </button>
              <button className="btn btn-secondary ms-1">add to cart</button>
            </div>
          </div>
        ))}
      </div>
        </div>
    </LayoutTemp>
  )
}

export default ProductDetails