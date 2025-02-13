import { useState } from 'react';
import styles from '../style/CategoriesDisplay.module.css';
import { Link } from 'react-router-dom';
import { categories } from './data';

function CategoriesDisplay() {
    const [activeCategory, setActiveCategory] = useState("Real Estate");

    const categoryBtns = [
        { name: "Real Estate", id: "real-estate-categories" },
        { name: "Home Products", id: "Home-product-categories" },
    ];

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className={`${styles.categoriesDisplay} mb-0 text-center`}>Explore Categories</h3>
                    </div>
                    <div className="col-md-12 mt-4">
                        <div className="d-flex justify-content-center">
                            {
                                categoryBtns.map((item, index) => (
                                    <button
                                        id={item.id}
                                        className={`${styles.categoriesDisplayBtn} btn ${activeCategory === item.name ? styles.categoryActive : ''}`}
                                        key={index}
                                        onClick={() => setActiveCategory(item.name)}
                                    >
                                        {item.name}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-md-12 pt-4">
                        <div className="row">
                            {
                                categories
                                    .filter(category => category.category === activeCategory) 
                                    .map((item, index) => (
                                        <div className={`${activeCategory === "Home Products" ? "col-md-4" : "col-md-4"} mb-4`} key={index}>
                                            <div className={`${styles.categoryBox} position-relative`}>
                                                <img src={item.img} alt="Pro Homez" className={`${styles.categoryImg}`} />
                                                <Link to={item.src || "#"} className={`${styles.categoryBoxHeading} text-decoration-none`}>
                                                    {item.buttonText}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoriesDisplay;
