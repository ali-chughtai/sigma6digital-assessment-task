import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts } from "../features/products/productSlice";
import styles from "../style/ExploreProducts.module.css";
import ProductBox from "./ProductBox";
import { useLocation } from "react-router-dom";

interface ExploreProductProps {
    category: string;
}

function ExploreProducts({ category }: ExploreProductProps) {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    // State to track active category
    const [activeCategory, setActiveCategory] = useState("All");

    // Fetch products from Redux store
    const products = useSelector((state: RootState) => state.products.items);
    const status = useSelector((state: RootState) => state.products.status);

    useEffect(() => {
        // Set the initial active category from props
        setActiveCategory(category);
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [location.pathname, category, dispatch, status]);

    // Filter products based on the selected category
    const filteredProducts =
        activeCategory === "All"
            ? products
            : products.filter(item => item.mainCategory === activeCategory);

    // Categories for filtering
    const categoryBtns = [
        { name: "All", id: "all-categories" },
        { name: "Real Estate", id: "real-estate-categories" },
        { name: "Home Products", id: "home-product-categories" },
        { name: "Electronics", id: "electronics" },
    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3 className={`${styles.exploreProductHeading} mb-0 text-center`}>
                        Explore Products
                    </h3>
                </div>

                {category === "All" && (
                    <div className="col-md-12 mt-4">
                        <div className="d-flex justify-content-center">
                            {categoryBtns.map((item, index) => (
                                <button
                                    id={item.id}
                                    className={`${styles.categoriesDisplayBtn} btn ${
                                        activeCategory === item.name ? styles.categoryActive : ""
                                    }`}
                                    key={index}
                                    onClick={() => setActiveCategory(item.name)}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="col-md-12">
                    <div className="row">
                        {status === "loading" ? (
                            <div className="col-md-12 text-center">
                                <p>Loading products...</p>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="col-md-12 text-center">
                                <p className="py-3">No products found in this category.</p>
                            </div>
                        ) : (
                            filteredProducts.map((item, index) => (
                                <div className="col-md-2 pt-4 px-2" key={index}>
                                    <ProductBox productDetail={item} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExploreProducts;
