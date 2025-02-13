import { Link } from 'react-router-dom';
import styles from '../style/VendorCard.module.css';

interface Vendor {
  featureImage?: string;
  src?: string;
  name?: string;
}

interface ProductCardProps {
  vendor: Vendor;
}

function VendorCard({ vendor }: ProductCardProps) {
  return (
    <>
        <Link to={vendor.src || "#"} className='text-decoration-none'>
          <div className={styles.cardBox}>
            {
              vendor.featureImage && 
                <div className={`${styles.imgBox}`}>
                  <img src={vendor.featureImage} alt={vendor.name} className={`w-100`} />
                </div>
            }
              <h5 className={`${styles.cardBoxName}`}>{vendor.name}</h5>
          </div>
        </Link>
    </>
  );
}

export default VendorCard;
