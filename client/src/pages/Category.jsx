import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import LayoutTemp from '../components/layout/LayoutTemp';

const Category = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const fetchCategoryProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const prodRes = await fetch(
        `http://localhost:9090/api/v1/category/products-by-category/${slug}`
      );
      const prodData = await prodRes.json();
      if (prodData.success) {
        setProducts(prodData.products);
      } else {
        setError(prodData.message || 'Failed to fetch products.');
        toast.error(prodData.message || 'Error fetching products.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
      toast.error('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchCategoryProducts();
  }, [slug]);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading products…</p>
      </div>
    );

  if (error)
    return (
      <div className="container py-5 text-center alert alert-danger">
        <h4>{error}</h4>
        <p>Please try again later.</p>
      </div>
    );

  return (
    <LayoutTemp>
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Filter Sidebar - exactly matching image */}
          <div className="col-md-3 pe-4" style={{ borderRight: '1px solid #eee' }}>
            <h1 className="h4 fw-bold mb-3">Sneakers ({products.length})</h1>
            <h2 className="h5 mb-2">Smoking Shoes</h2>
            <p className="text-muted small mb-4">Lifestyle</p>

            <div className="mb-4">
              <h3 className="h6 fw-bold mb-3">Price Range</h3>
              <table className="w-100 mb-3">
                <thead>
                  <tr>
                    <th className="small text-start">Min</th>
                    <th className="small text-end">Max</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <div className="d-flex justify-content-between">
                        <input 
                          type="text" 
                          className="form-control form-control-sm w-45" 
                          placeholder="0" 
                        />
                        <input 
                          type="text" 
                          className="form-control form-control-sm w-45" 
                          placeholder="10000" 
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <h3 className="h6 fw-bold mb-3">Brand</h3>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="nike" />
                <label className="form-check-label" htmlFor="nike">Nike</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="adidas" />
                <label className="form-check-label" htmlFor="adidas">Adidas</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="balenciaga" />
                <label className="form-check-label" htmlFor="balenciaga">Balenciaga</label>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="h6 fw-bold mb-3">Size</h3>
              <div className="d-flex flex-wrap gap-2">
                {[38, 39, 40, 41, 42, 43].map(size => (
                  <button 
                    key={size} 
                    className="btn btn-sm p-0" 
                    style={{
                      width: '30px',
                      height: '30px',
                      border: '1px solid #ddd',
                      borderRadius: '0',
                      fontSize: '12px'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="btn btn-link p-0 text-decoration-none fw-bold"
              style={{ fontSize: '14px' }}
            >
              Clear Filters
            </button>
          </div>

          {/* Products Grid - updated to match image exactly */}
          <div className="col-md-9">
            <div className="row row-cols-1 row-cols-md-3 gx-4 gy-5"> {/* Increased gap between products */}
              {currentProducts.map((p) => {
                // Split product name for display
                const nameParts = p.name.split(' ');
                const brand = nameParts[0];
                const model = nameParts.slice(1, -2).join(' ');
                const color = nameParts.slice(-2).join(' ');

                return (
                  <div className="col" key={p._id}>
                    <Link to={`/product/${p.slug}`} className="text-decoration-none text-dark">
                      <div className="card h-100 border-0" style={{ minHeight: '350px' }}> {/* Increased height */}
                        <div className="card-img-top p-3" style={{ height: '400px', overflow: 'hidden' }}>
                          <img
                            src={`http://localhost:9090/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            className="w-100 h-100 object-fit-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://placehold.co/280x280?text=No+Image';
                            }}
                          />
                        </div>
                        <div className="card-body p-2">
                          <h5 className="card-title mb-1">{brand}</h5>
                          <p className="text-muted mb-1">{model}</p>
                          <p className="text-muted small mb-2">{color}</p>
                          <p className="fw-bold mt-2">${p.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between mt-5 mb-4">
              <button 
                className="btn btn-outline-secondary btn-sm"
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button 
                className="btn btn-outline-secondary btn-sm"
                disabled={currentProducts.length < productsPerPage}
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutTemp>
  );
};

export default Category;