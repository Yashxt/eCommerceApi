import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import LayoutTemp from '../components/layout/LayoutTemp';

const Category = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [ratings, setRatings] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

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
        const brands = [...new Set(
          prodData.products.map((p) => p.name.split(' ')[0].toLowerCase())
        )];
        setAvailableBrands(brands);
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
    <div className="container-fluid my-4">
      <div className="d-flex flex-wrap gap-4">
        <aside className="filter-sidebar p-4 border rounded shadow-sm">
          <h5 className="fw-semibold mb-3">Filter By</h5>

          <div className="mb-4">
            <h6 className="fw-semibold mb-2">Price</h6>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="form-range"
            />
            <div className="d-flex justify-content-between small text-muted">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-semibold mb-2">Ratings</h6>
            {[5, 4, 3, 0].map((r) => (
              <div className="form-check small" key={r}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="ratingsRadio"
                  id={`rating-${r}`}
                  checked={ratings === r}
                  onChange={() => setRatings(r)}
                />
                <label className="form-check-label" htmlFor={`rating-${r}`}>
                  {r ? `${r}★ ${r === 5 ? '' : '& Up'}` : 'All Ratings'}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h6 className="fw-semibold mb-2">Brands</h6>
            {availableBrands.map((brand) => (
              <div className="form-check small" key={brand}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => {
                    setSelectedBrands((prev) =>
                      prev.includes(brand)
                        ? prev.filter((b) => b !== brand)
                        : [...prev, brand]
                    );
                  }}
                  id={`brand-${brand}`}
                />
                <label className="form-check-label" htmlFor={`brand-${brand}`}>
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </label>
              </div>
            ))}
          </div>

          <button className="btn btn-primary w-100 mb-2">Apply Filters</button>
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => {
              setPriceRange([0, 10000]);
              setRatings(0);
              setSelectedBrands([]);
            }}
          >
            Clear Filters
          </button>
        </aside>

        <main className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="h5 mb-0">
              Showing {products.length} products
            </h3>
            <select className="form-select form-select-sm w-auto">
              <option>Newest</option>
              <option>Price: Low → High</option>
              <option>Price: High → Low</option>
              <option>Average Rating</option>
            </select>
          </div>

          {products.length === 0 ? (
            <div className="alert alert-info text-center">No products found.</div>
          ) : (
            <div className="product-grid">
              {products.map((p) => (
                <Link
                  to={`/product/${p.slug}`}
                  key={p._id}
                  className="product-card text-decoration-none text-dark"
                >
                  <div className="card h-100 border-0 shadow-sm">
                    <img
                      src={`http://localhost:9090/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="card-img-top p-3 product-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/280x280?text=No+Image';
                      }}
                    />
                    <div className="card-body text-center">
                      <h6 className="card-title mb-1">{p.name}</h6>
                      <p className="fw-bold text-primary mb-0">
                        ${p.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ----- Pagination UI Placeholder -------------------- */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className="page-item disabled">
                  <button className="page-link">Previous</button>
                </li>
                <li className="page-item active">
                  <button className="page-link">1</button>
                </li>
                <li className="page-item">
                  <button className="page-link">2</button>
                </li>
                <li className="page-item">
                  <button className="page-link">3</button>
                </li>
                <li className="page-item">
                  <button className="page-link">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </main>
      </div>

      <style>{`
        .filter-sidebar {
          width: 260px;
          max-height: calc(100vh - 6rem);
          overflow-y: auto;
        }
        .product-grid {
          --min: 220px;
          display: grid;
          grid-gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(var(--min), 1fr));
        }
        .product-thumb {
          height: 220px;
          object-fit: contain;
        }
        @media (max-width: 767px) {
          .filter-sidebar {
            width: 100%;
            max-height: none;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </div>
    </LayoutTemp>
  );
};

export default Category;
