import styles from '../style/VendorDisplay.module.css';
import vendorLogo from "../assets/images/vendor-temporary.webp";
import VendorCard from './VendorCard';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

function VendorDisplay() {
    const vendors = [
        { featureImage: vendorLogo, src: "#", name: "Wood In-out" },
        { featureImage: vendorLogo, src: "#", name: "KORKMAZ MOBILYA" },
        { featureImage: vendorLogo, src: "#", name: "ITTIHAD" },
        { featureImage: vendorLogo, src: "#", name: "Damac" },
        { featureImage: vendorLogo, src: "#", name: "ZEM Builders" },
        { featureImage: vendorLogo, src: "#", name: "Landchester" },
        { featureImage: vendorLogo, src: "#", name: "MGC Develop" },
        { featureImage: vendorLogo, src: "#", name: "Prism Heights" },
    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3 className={`${styles.vendorDisplay} mb-0 text-center`}>Top Rated Vendors</h3>
                </div>
                <div className="col-md-12 py-4 position-relative">
                    <div className="row flex-nowrap overflow-hidden py-3">
                        {vendors.map((item, index) => (
                            <div className="col-md-2" key={index}>
                                <VendorCard vendor={item} />
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.sliderBtnContainer}`}>
                        <div className={`${styles.sliderBtn}`}>
                            <MdArrowBackIosNew />
                        </div>
                        <div className={`${styles.sliderBtn}`}>
                            <MdArrowForwardIos />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorDisplay;
