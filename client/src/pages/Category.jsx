import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Assuming you have a ProductCard component already
// import ProductCard from '../components/ProductCard'; // Create this if you don't have one

const Category = () => {
    const { slug } = useParams(); // Get the category slug from the URL
    const [categoryName, setCategoryName] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states (for future implementation)
    const [priceRange, setPriceRange] = useState([0, 10000]); // Example: min and max price
    const [ratings, setRatings] = useState(0); // Example: 0 for no filter, 4 for 4-star & up
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [availableBrands, setAvailableBrands] = useState([]); // All brands from backend

    // Fetch Category Products
    const fetchCategoryProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch category details first to get the category name for breadcrumbs
            const categoryRes = await fetch(`http://localhost:9090/api/v1/category/single-category/${slug}`);
            const categoryData = await categoryRes.json();
            if (categoryData.success && categoryData.category) {
                setCategoryName(categoryData.category.name);
            } else {
                setCategoryName('Unknown Category');
                // You might want to handle cases where category is not found more robustly
            }

            // Fetch products for the category
            const productsRes = await fetch(`http://localhost:9090/api/v1/product/category/${slug}`);
            const productsData = await productsRes.json();

            if (productsData.success) {
                setProducts(productsData.products); // Assuming your API returns products in a 'products' array
            } else {
                setError(productsData.message || 'Failed to fetch products for this category.');
                toast.error(productsData.message || 'Error fetching products.');
            }
        } catch (err) {
            console.error('Error fetching category products:', err);
            setError('Failed to connect to the server.');
            toast.error('Failed to connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    // // Optional: Fetch all brands for the filter sidebar (if you implement brand filtering)
    // const fetchBrands = async () => {
    //     try {
    //         const res = await fetch(`${process.env.REACT_APP_API}/api/v1/brands/get-all`); // Replace with your actual brand endpoint
    //         const data = await res.json();
    //         if (data.success) {
    //             setAvailableBrands(data.brands);
    //         }
    //     } catch (err) {
    //         console.error('Error fetching brands:', err);
    //     }
    // };


    useEffect(() => {
        if (slug) {
            fetchCategoryProducts();
            // fetchBrands(); // Uncomment if you add brand filtering
        }
    }, [slug]); // Re-fetch products when slug changes

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading products...</span>
                </div>
                <p className="mt-3">Loading products for {categoryName || 'category'}...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 text-center alert alert-danger">
                <h4>Error: {error}</h4>
                <p>Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4"> {/* Using container-fluid for full width */}
            <div className="row">
                {/* Left Sidebar for Filters */}
                <div className="col-lg-3 col-md-4 mb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{categoryName}</li>
                        </ol>
                    </nav>
                    <div className="card shadow-sm p-3">
                        <h4 className="mb-3">Filter By</h4>

                        {/* Price Range Filter */}
                        <div className="mb-4">
                            <h6>Price Range</h6>
                            {/* You'd integrate a range slider component here */}
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                max="5000"
                                step="100"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                            />
                            <div className="d-flex justify-content-between">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                            {/* More advanced slider needs a library like rc-slider or react-slider */}
                        </div>

                        {/* Ratings Filter */}
                        <div className="mb-4">
                            <h6>Ratings</h6>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="ratingsRadio" id="rating5" checked={ratings === 5} onChange={() => setRatings(5)} />
                                <label className="form-check-label" htmlFor="rating5">
                                    <i className="bi bi-star-fill text-warning"></i> 5 Star
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="ratingsRadio" id="rating4" checked={ratings === 4} onChange={() => setRatings(4)} />
                                <label className="form-check-label" htmlFor="rating4">
                                    <i className="bi bi-star-fill text-warning"></i> 4 Star & Up
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="ratingsRadio" id="rating3" checked={ratings === 3} onChange={() => setRatings(3)} />
                                <label className="form-check-label" htmlFor="rating3">
                                    <i className="bi bi-star-fill text-warning"></i> 3 Star & Up
                                </label>
                            </div>
                             <div className="form-check">
                                <input className="form-check-input" type="radio" name="ratingsRadio" id="rating0" checked={ratings === 0} onChange={() => setRatings(0)} />
                                <label className="form-check-label" htmlFor="rating0">
                                    All Ratings
                                </label>
                            </div>
                        </div>

                        {/* Brands Filter (Uncomment and implement fetchBrands if using) */}
                        {/* <div className="mb-4">
                            <h6>Brands</h6>
                            {availableBrands.map(brand => (
                                <div className="form-check" key={brand._id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={brand.name}
                                        id={`brand-${brand._id}`}
                                        checked={selectedBrands.includes(brand.name)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedBrands([...selectedBrands, brand.name]);
                                            } else {
                                                setSelectedBrands(selectedBrands.filter(b => b !== brand.name));
                                            }
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor={`brand-${brand._id}`}>
                                        {brand.name}
                                    </label>
                                </div>
                            ))}
                        </div> */}

                        <button className="btn btn-primary w-100 mt-3" onClick={() => { /* Apply Filters Logic */ }}>Apply Filters</button>
                        <button className="btn btn-outline-secondary w-100 mt-2" onClick={() => {
                            setPriceRange([0, 10000]);
                            setRatings(0);
                            setSelectedBrands([]);
                            // Re-fetch products after clearing filters if desired
                        }}>Clear Filters</button>
                    </div>
                </div>

                {/* Right Product Grid */}
                <div className="col-lg-9 col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="mb-0">Results for '{categoryName}' ({products.length} products)</h3>
                        <div className="d-flex align-items-center">
                            <span className="me-2">Sort By:</span>
                            <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                                <option>Newest</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Average Rating</option>
                            </select>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="alert alert-info text-center mt-5" role="alert">
                            No products found for '{categoryName}'.
                        </div>
                    ) : (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                            {products.map(product => (
                                <div className="col" key={product._id}>
                                    {/* Replace with your actual ProductCard component */}
                                    <div className="card h-100 shadow-sm">
                                        <Link to={`/product/${product.slug}`} className="text-decoration-none text-dark">
                                            <img
                                                src= `http://localhost:9090/api/v1/product/product-photo/${product._id}`
                                                className="card-img-top p-3"
                                                alt={product.name}
                                                style={{ objectFit: 'contain', height: '180px' }}
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/180?text=No+Image'; }}
                                            />
                                            <div className="card-body text-center">
                                                <h5 className="card-title fs-6">{product.name}</h5>
                                                <p className="card-text fw-bold text-primary">${product.price.toLocaleString()}</p>
                                            </div>
                                        </Link>
                                        <div className="card-footer bg-white border-0 text-center pb-3">
                                            <button className="btn btn-primary btn-sm">Add to Cart</button>
                                        </div>
                                    </div>
                                    {/* <ProductCard product={product} /> */}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination (Optional, requires more state and API adjustments) */}
                    {/* <nav aria-label="Page navigation" className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav> */}
                </div>
            </div>
        </div>
    );
};

export default Category;