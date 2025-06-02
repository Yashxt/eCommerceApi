import React, { useState, useEffect } from 'react';
import LayoutTemp from '../components/layout/LayoutTemp';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart.jsx';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { cart, setCart } = useCart();

  // ✅ Fetch product details
  const getProduct = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/v1/product/get-product/${params.slug}`);
      const data = await response.json();
      setProduct(data?.product);

      if (data?.product?._id && data?.product?.category?._id) {
        getSimilarProduct(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.log("Product fetch error:", error);
    }
  };

  // ✅ Fetch similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const response = await fetch(`http://localhost:9090/api/v1/product/similar-product/${pid}/${cid}`);
      const data = await response.json();
      console.log(data.product)
      setRelatedProducts(data?.product || []);
    } catch (error) {
      console.log("Similar product fetch error:", error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  // ✅ Add to cart handler
  const handleAddToCart = (item) => {
    const updatedCart = [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart");
  };

  return (
    <LayoutTemp>
      <div className="container pd-wrapper">
      <div className="row gy-5 align-items-start">
        {/* ───── Primary product column ───── */}
        <div className="col-lg-6">
          <div className="pd-img-box shadow-sm rounded">
            <img
              src={`http://localhost:9090/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-100 h-100 object-fit-cover rounded"
            />
          </div>
        </div>

        {/* ───── Details column ───── */}
        <div className="col-lg-6">
          <h1 className="pd-heading mb-1">{product.name}</h1>
          <p className="pd-subheading mb-3">{product.subTitle || 'Recovery Sneakers'}</p>

          <p className="pd-price">${product.price}</p>

          {/* Size options – purely presentational */}
          <div className="mb-4">
            <h6 className="mb-2 fw-semibold">Size</h6>
            {[40, 41, 42, 43].map((sz) => (
              <button key={sz} className="pd-size-btn me-2">{sz}</button>
            ))}
          </div>

          {/* Color swatches – purely presentational */}
          <div className="mb-4">
            <h6 className="mb-2 fw-semibold">Color</h6>
            {['#d22', '#2d5', '#248'].map((clr, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: clr }}
                className="pd-color-swatch d-inline-block"
              />
            ))}
          </div>

          <button
            className="pd-cart-btn mb-4"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>

          <p className="lh-base" style={{ maxWidth: 480 }}>
            {product.description ||
              'The Palm Angels Recovery sneaker combines contemporary streetwear aesthetics with luxury craftsmanship. Features include premium leather construction, cushioned sole unit, and signature branding details.'}
          </p>
        </div>
      </div>

      {/* ───── Related products row ───── */}
      <div className="related-section">
        <h3 className="related-heading">You May Also Like</h3>
        {relatedProducts.length === 0 ? (
          <p className="text-center">No similar products found</p>
        ) : (
          <div className="row g-3 flex-nowrap overflow-auto">
            {relatedProducts.map((p) => (
              <div key={p._id} className="col-8 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 border-0 related-card"
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={`http://localhost:9090/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  />
                  <div className="card-body px-0">
                    <h6 className="card-title mb-1 fw-semibold">{p.name}</h6>
                    <p className="text-muted mb-2">${p.price}</p>
                    <button
                      className="btn btn-sm btn-outline-dark w-100"
                      onClick={() => handleAddToCart(p)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </LayoutTemp>
  );
};

export default ProductDetails;
