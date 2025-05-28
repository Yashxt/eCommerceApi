import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/Auth.jsx';

const FeaturedProduct = () => {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

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

    const carouselSlides = Array.isArray(products)
        ? products.slice(0, 3).map((product) => ({
            id: product._id,
            image: product.photo,
            title: product.name,
            description: product.description,
            alt: product.name,
            slug: product.slug,
        }))
        : [];

    useEffect(() => {
        if (carouselSlides.length > 0) {
            const interval = setInterval(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [carouselSlides.length]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading products...</span>
                </div>
                <p className="mt-2">Loading products...</p>
            </div>
        );
    }

    if (products.length === 0 && !loading) {
        return (
            <div className="text-center py-5">
                <p className="lead">No featured products available at the moment.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Carousel Section (Only 3 products) */}
            <div id="newCollectionCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {carouselSlides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#newCollectionCarousel"
                            data-bs-slide-to={index}
                            className={index === activeIndex ? 'active' : ''}
                            aria-current={index === activeIndex ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => setActiveIndex(index)}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {carouselSlides.map((slide, index) => (
                        <div key={slide.id} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                            <img
                                src={`http://localhost:9090/api/v1/product/product-photo/${slide.id}`}
                                className="d-block w-100"
                                alt={slide.alt}
                                style={{ maxHeight: '600px', objectFit: 'cover' }}
                            />
                            <div className="carousel-caption d-none d-md-block text-center text-white">
                                <h1 className="display-4 fw-bold mb-3">{slide.title}</h1>
                                <p className="lead mb-4">{slide.description}</p>
                                <Link to={`/product/${slide.slug}`} className="btn btn-light btn-lg">View Product</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#newCollectionCarousel" data-bs-slide="prev" onClick={() => setActiveIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#newCollectionCarousel" data-bs-slide="next" onClick={() => setActiveIndex((prev) => (prev + 1) % carouselSlides.length)}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* All Products Section */}
           
        </div>
    );
};

export default FeaturedProduct;
 