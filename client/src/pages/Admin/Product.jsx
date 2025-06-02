import { useState, useEffect } from "react";
import LayoutTemp from '../../components/layout/LayoutTemp';
import AdminMenu from './../../components/layout/AdminMenu';
import toast from 'react-hot-toast';
import { useAuth } from "../../context/Auth";
import { Link } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);
  const { auth } = useAuth();

  // Get all products
  const getAllProduct = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/v1/product/get-product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth?.token}`
        },
      });

      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProduct();
    //eslint-disable-next-line
  }, []);

  return (
    <LayoutTemp title="admin-products">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>all product list</h1>

          <div className="container">
            <div className="row">
              {product?.map(p => (
                <div className="col-md-4 mb-4 d-flex justify-content-center" key={p._id}>
                  <Link to={`/dashboard/admin/products/${p.slug}`} className="product-link" style={{ textDecoration: "none" }}>
                    <div className="card h-100 d-flex flex-column" style={{ width: "18rem", minHeight: "370px" }}>
                      <img
                        src={`http://localhost:9090/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column justify-content-between">
                        <h5 className="card-title text-dark">{p.name}</h5>
                        <p className="card-text text-secondary">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </LayoutTemp>
  );
};

export default Product;
