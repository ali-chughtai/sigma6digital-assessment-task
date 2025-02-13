import styles from '../style/RealEstateListingAgentSidebar.module.css'
import vendorLogo from '../assets/images/vendor-temporary.webp'
import { VendorDetail } from './types'

interface RealEstateListingProps {
    vendorDetail: VendorDetail
}

function RealEstateListingAgentSidebar({vendorDetail}: RealEstateListingProps) {
    const cleanedPhoneNumber = vendorDetail.store_phone && vendorDetail.store_phone.replace(/[^\d+]/g, '');
  return (
    <>
        <div className={`${styles.realEstateListingAgent}`}>
            <h5 className={`${styles.listingAgentHeading}`}>Listing Agent</h5>
            <div className={`${styles.listingAgentDetailBox} d-flex my-4`}>
                <div className={`${styles.imgBox}`}>
                    <img src={vendorDetail.image || vendorLogo} alt="ProHomez" />
                </div>
                <div className={`${styles.listingAgentDetail}`}>
                    <h4 className={`${styles.vendorName}`}>{vendorDetail.store_name}</h4>
                    <p className={`${styles.vendorDetail} mb-0`}>{vendorDetail.email}</p>
                    <p className={`${styles.vendorDetail} mb-0`}>{vendorDetail.store_phone}</p>
                </div>
            </div>
                <div className={`${styles.contactButtons} pt-3`}>
                    <a href={`tel:${cleanedPhoneNumber}`} className={`${styles.vendorContactBtn} text-decoration-none btn`}>Speak with Agent</a>
                    <a href={`mailto:${vendorDetail.email}`} className={`${styles.vendorContactBtn} text-decoration-none btn`}>Reach Out via Email</a>
                </div>
        </div>
    </>
  )
}

export default RealEstateListingAgentSidebar