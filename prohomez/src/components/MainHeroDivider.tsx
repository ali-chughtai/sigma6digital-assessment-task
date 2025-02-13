import styles from '../style/MainHeroDivider.module.css'
import realEstateIllustration from '../assets/images/realestate-icon.webp'
import { Link } from 'react-router-dom'

function MainHeroDivider() {
  return (
    <>
        <section className={`${styles.mainHeroDivider}`}>
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-md-6 ${styles.heroBoxContainer} ${styles.realestateBackground} position-relative`}>
                        <div className={`${styles.heroBox}`}>
                            <div className={`${styles.heroBoxContent} position-relative`}>
                                <img src={realEstateIllustration} alt="Pro Homez" className={`${styles.mainHeroIllustration}`} />
                                <h2 className={`${styles.mainHeroHeading}`}>Your Property, Your Future</h2>
                                <p className={`${styles.mainHeroParagraph} text-center`}>Design your lifestyle with beautiful home.</p>
                                <Link to="#" className={`btn ${styles.mainHeroBtn}`}>Browse Properties</Link>
                            </div>
                        </div>
                    </div>
                    <div className={`col-md-6 ${styles.heroBoxContainer} ${styles.homeProductBackground} position-relative`}>
                        <div className={`${styles.heroBox}`}>
                            <div className={`${styles.heroBoxContent} position-relative`}>
                                <img src={realEstateIllustration} alt="Pro Homez" className={`${styles.mainHeroIllustration}`} />
                                <h2 className={`${styles.mainHeroHeading}`}>Shop Home Products</h2>
                                <p className={`${styles.mainHeroParagraph} text-center`}>Design your lifestyle with beautiful home products.</p>
                                <Link to="#" className={`btn ${styles.mainHeroBtn}`}>Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default MainHeroDivider