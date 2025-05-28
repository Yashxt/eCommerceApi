import {useState,useEffect} from 'react';
import{ Link} from "react-router-dom";
import {useAuth} from "../../context/Auth.jsx"
import toast from "react-hot-toast";
const NewCollection = () => {

 const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { auth,setAuth } = useAuth();

 const getAllProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:9090/api/v1/product/get-product`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(auth?.token && { "Authorization": `Bearer ${auth.token}` })
                },
            });

            const data = await response.json();
            console.log(data.product);
            setLoading(false);

            if (data?.success && Array.isArray(data?.product)) {
                setProducts(data.product);
            } else {
                toast.error(data?.message || "Failed to fetch products.");
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching products:", error);
            toast.error("Something went wrong while fetching products.");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, [auth?.token]);
    return (
        <section className="py-5 bg-white">
            <div className="container">
                 <h2 
            className="mb-4 fw-bold"
            style={{ fontSize: '28px', textAlign: 'left' }}
        >
            Featured Products
        </h2>
                <div className="row g-4">
                    {products.map(product => (
                        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <div className="card h-100 border-0 shadow-sm">
                                <Link to={`/product/${product.slug}`} className="text-decoration-none text-dark">
                                    <img src={`http://localhost:9090/api/v1/product/product-photo/${product._id}`} className="card-img-top p-3" alt={product.name} style={{ objectFit: 'contain', height: '200px' }} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title fw-normal">{product.name}</h5>
                                        <p className="card-text text-muted">{product.price}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default NewCollection