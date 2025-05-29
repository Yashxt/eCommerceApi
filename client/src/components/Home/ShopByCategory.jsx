import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const stripRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('http://localhost:9090/api/v1/category/get-category');
        const data = await res.json();
        if (data.success) setCategories(data.category);
        else toast.error(data.message || 'Failed to fetch categories');
      } catch (err) {
        console.error(err);
        toast.error('Could not load categories.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const scrollBy = (dx) =>
    stripRef.current?.scrollBy({ left: dx, behavior: 'smooth' });

  if (loading)
    return (
      <section className="py-5 bg-light text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading categories…</p>
      </section>
    );

  if (!categories.length)
    return (
      <section className="py-5 bg-light text-center">
        <p className="lead">No categories available.</p>
      </section>
    );

  return (
    <section className="py-5 bg-light position-relative">
      <div className="container">
        <h2 className="mb-4 fw-bold"
            style={{ fontSize: '28px', textAlign: 'left' }}>Shop By Category</h2>

        <div className="position-relative">
          <button
            type="button"
            className="scroll-btn shadow"
            style={{ left: '-15px' }}
            onClick={() => scrollBy(-300)}
            aria-label="scroll left"
          >
            <i className="bi bi-chevron-left fs-3" />
          </button>

          <div ref={stripRef} className="strip d-flex flex-nowrap">
            {categories.map((c) => (
              <div key={c._id} className="cat-card me-3">
                <Link
                  to={`/category/${c.slug}`}
                  className="card border-0 shadow-sm h-100 text-decoration-none text-dark d-flex flex-column"
                >
                  <div className="img-box">
                    <img
                      src={`http://localhost:9090/api/v1/category/category-photo/${c._id}`}
                      alt={c.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.png';
                      }}
                      width="240"
                      height="160"
                    />
                  </div>
                  <div className="card-body text-center d-flex flex-column">
                    <h6 className="fw-normal mb-1 text-truncate">{c.name}</h6>
                    <p className="small text-muted mb-2">
                      {c.price ? `$${c.price}` : 'Price Varies'}
                    </p>
                    <span className="btn btn-link p-0 mt-auto">Shop Now</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="scroll-btn shadow"
            style={{ right: '-15px' }}
            onClick={() => scrollBy(300)}
            aria-label="scroll right"
          >
            <i className="bi bi-chevron-right fs-3" />
          </button>
        </div>
      </div>

      <style>{`
        .strip {
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -ms-overflow-style: none;
          scrollbar-width: none;
          scrollbar-gutter: stable both-edges;
          padding-bottom: 6px;
        }
        .strip::-webkit-scrollbar { display: none; }

        .cat-card { flex: 0 0 auto; width: 260px; scroll-snap-align: start; }
        .cat-card .card { height: 360px; }

        .img-box {
          height: 170px;
          width: 100%;
          background:#f8f9fa;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow: hidden;
        }
        .img-box img {
          object-fit: contain;
          display: block;
        }

        .scroll-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background:#fff;
          border: 1px solid #ced4da;
          display:flex;
          align-items:center;
          justify-content:center;
          z-index: 20;
        }
      `}</style>
    </section>
  );
};

export default ShopByCategory;
