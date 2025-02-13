import { useState, useEffect } from "react";
import styles from "../style/ExploreProducts.module.css";
import { vendors } from "./data";
import VendorCard from "./VendorCard";

interface ExploreProductProps {
    category: string;
}

function Vendors({ category }: ExploreProductProps) {
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        setActiveCategory(category);
    }, [category]);

    const categoryBtns = [
        { name: "All", id: "all-categories" },
        { name: "Real Estate", id: "real-estate-categories" },
        { name: "Home Products", id: "home-product-categories" },
    ];

    const filteredProducts = activeCategory === "All" 
        ? vendors
        : vendors.filter(item => item.parentCategory === activeCategory);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className={`${styles.exploreProductHeading} mb-0 text-center`}>Explore Our Trusted Partners in Real Estate & Home Products</h3>
                    </div>
                    {category === "All" && (
                        <div className="col-md-12 mt-4">
                            <div className="d-flex justify-content-center">
                                {categoryBtns.map((item, index) => (
                                    <button
                                        id={item.id}
                                        className={`${styles.categoriesDisplayBtn} btn ${activeCategory === item.name ? styles.categoryActive : ''}`}
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
                            {filteredProducts.length === 0 ? (
                                <div className="col-md-12 text-center">
                                    <p>No Vendors found in this category.</p>
                                </div>
                            ) : (
                                filteredProducts.map((item, index) => (
                                    <div className="col-md-3 pt-4 px-2" key={index}>
                                        <VendorCard vendor={item} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Vendors;
