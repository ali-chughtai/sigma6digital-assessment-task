
import styles from '../style/PageHero.module.css';
import SearchBox from './SearchBox';
import defaultBgImg from '../assets/images/home-product-hero-bg.webp';
import { PageHeroProps } from './types';

const PageHero: React.FC<PageHeroProps> = ({ 
  heading, 
  description, 
  quickSearches = ['Real Estate', 'Home Products'], 
  bgImage = defaultBgImg 
}) => (
  <section className={`${styles.pageHero} d-flex justify-content-center align-items-center position-relative`}>
    <img src={bgImage} alt="ProHomez" className={`${styles.pageHeroBgImg} position-absolute`} />
    <div className={`container position-relative ${styles.pageHeroContainer}`}>
      <div className="row">
        <div className="col-12">
          <div className={`${styles.contentBox} d-flex flex-column align-items-center text-white text-center`}>
            <h2 className={`${styles.pageHeroHeading} mb-0`}>{heading}</h2>
            {description &&  <p className={`${styles.pageHeroDescription} mb-0`}>{description}</p>}
            <div className={`${styles.searchBoxContainer} w-100`}>
              <SearchBox />
              <div className={`${styles.inputQuickSearches}`}>
                <p className={`${styles.inputQuickSearchPara} py-4`}>
                  {quickSearches.map((term, index) => (
                    <span key={index} className={`${styles.inputQuickSearchBox}`}>
                      {term}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PageHero;
