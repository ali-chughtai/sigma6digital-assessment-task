import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HomeProductDetail.module.css';
import { MdArrowBackIosNew, MdArrowForwardIos, MdOutlineArrowDropUp } from 'react-icons/md';
import star from '../../assets/svg/star.svg';
import { TiMinus, TiPlus } from 'react-icons/ti';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AppDispatch, RootState } from '../../store/store';
import { fetchSingleProduct } from '../../features/products/productSlice';
import { Product } from '../../components/types';

function HomeProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.products.singleProduct);
  const productStatus = useSelector((state: RootState) => state.products.status);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

   const selectedImages = Array.isArray(product?.selectedImages)
    ? product.selectedImages
    : JSON.parse(product?.selectedImages || "[]");

    const totalImages = selectedImages.length + 1;
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalImages - 2));
  };
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < totalImages - 2 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    if (slug) {
      dispatch(fetchSingleProduct(slug));
    }
  }, [slug, dispatch]);

  if (productStatus === 'loading' || !product) {
    return <div>Loading...</div>;
  }

  const incrementValue = () => {
    if (value < 15) setValue(value + 1);
  };

  const decrementValue = () => {
    if (value > 1) setValue(value - 1);
  };
  const handleAddToCart = () => {
    // Retrieve the existing cart from localStorage
    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

    if (!product) return;

    // Remove existing product if present
    const updatedCart = cart.filter((item) => item.id !== product.id);

    // Add new product to cart
    updatedCart.push({
      ...product,
      quantity: value, // Include quantity
    });

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart successfully!');
  };

  const handleInputChange = (e: any) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      if (newValue >= 1 && newValue <= 15) {
        setValue(newValue);
      } else if (newValue < 1) {
        setValue(1);
      } else if (newValue > 15) {
        setValue(15);
      }
    } else {
      setValue(1);
    }
  };

  const truncateDescription = (description: string, maxWords: number) => {
    const words = description.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return description;
  };

  return (
    <>
      <section className={`${styles.homeProductDetailMainBox} py-5`}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 position-relative px-3">
              <div className={`${styles.imageCarousel} overflow-hidden`}>
                <div
                  className={`${styles.imageBox} d-flex`}
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {selectedImages.map((item: any, index: number) => (
                        <img
                            src={`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${item}`}
                            alt={`Product Image ${index}`}
                            className={`${styles.productImage} w-100`}
                            key={index}
                        />
                    ))}

                </div>
                <div className={`${styles.carouselBtn}`}>
                  <div className={`${styles.sliderBtn}`} onClick={goToPrevious}>
                    <MdArrowBackIosNew />
                  </div>
                  <div className={`${styles.sliderBtn}`} onClick={goToNext}>
                    <MdArrowForwardIos />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 px-4">
              <div className={`${styles.productDetailContentMainBox} py-3`}>
                <h2 className={`${styles.productName}`}>{product.productName}</h2>
                <h4 className={`${styles.vendorName}`}>
                  BY <Link to="#">{JSON.parse(`${product.vendorDetails}`)?.store_name}</Link>
                </h4>
                <div className={`${styles.reviewBox} d-flex py-1`}>
                  {product.numberOfReviews > 0 &&
                    Array.from({ length: product.numberOfReviews }).map((_, index) => (
                      <img
                        key={index}
                        src={star}
                        alt="Pro Homez"
                        className={`${styles.reviewStar}`}
                      />
                    ))}
                </div>
                <div className={`${styles.productPriceBox} d-flex py-3 align-items-end`}>
                  <h4 className={`${styles.productDiscountedPrice} mb-0`}>${product.discountedPrice || 0 <= 0 ? product.productPrice : product.discountedPrice}</h4>
                  {product.discountedPrice || 0 > 0 && <h4 className={`${styles.productPrice} mb-0`}>${product.productPrice}</h4>}
                </div>
                <div className={`d-flex gap-3 align-items-center my-3`}>
                  <div className={`${styles.cartValueBox} d-flex align-items-center`}>
                    <span className={`${styles.cartvalueController}`} onClick={decrementValue}>
                      <TiMinus />
                    </span>
                    <input
                      type="number"
                      className={`${styles.cartValueDisplay}`}
                      value={value}
                      onChange={handleInputChange}
                    />
                    <span className={`${styles.cartvalueController}`} onClick={incrementValue}>
                      <TiPlus />
                    </span>
                  </div>
                  <button className={`${styles.addToCartBtn} btn`} onClick={handleAddToCart}>Add To Cart</button>
                </div>
                <div className={`${styles.descriptionBox} pb-3`}>
                  <h5 className={`${styles.productDetailHeading}`}>Description</h5>
                  <p className={`${styles.productDetailPara} mb-0`}>
                    {isDescriptionExpanded ? product.productDescription : truncateDescription(product.productDescription, 90)}
                    {product.productDescription.split(' ').length > 90 && (
                      <button
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        className={`${styles.readMoreButton}`}
                      >
                        {isDescriptionExpanded ? (
                          <>
                            Show Less
                            <MdOutlineArrowDropUp />
                          </>
                        ) : (
                          <>
                            Read More
                            <IoMdArrowDropdown />
                          </>
                        )}
                      </button>
                    )}
                  </p>
                </div>
                {/* {product.keySpecification && (
                  <div className={`${styles.specificationBox}`}>
                    <h5 className={`${styles.productDetailHeading}`}>Specifications</h5>
                    <ul className="list-unstyled">
                      {Object.entries(product.keySpecification).map(
                        ([key, value]) =>
                          value && (
                            <li key={key} className={`${styles.keySpecifications}`}>
                              <span className="fw-bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>{' '}
                              <span>{value}</span>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeProductDetail;
