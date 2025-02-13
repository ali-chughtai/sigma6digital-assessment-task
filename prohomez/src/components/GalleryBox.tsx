import styles from '../style/GalleryBox.module.css'

interface GalleryBoxProps {
    featureImage: string;
    images?: string[];
}

function GalleryBox({featureImage, images} : GalleryBoxProps) {
  return (
    <>
        <div className="container">
            <div className="row">
                    <div className="row">
                        <div className="col-md-6">
                            <div className={`${styles.galleryFeatureImgBox}`}>
                                <img src={`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${featureImage}`} alt="ProHomez" className={`w-100 ${styles.productImg} h-100`} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row row-gap-4">
                                {images && images.slice(1).map((item, index) => (
                                    <div className="col-6"  key={index}>
                                        <div className={`${styles.galleryImgBox}`}>
                                            <img src={`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/images/${item}`} alt="ProHomez" className={`w-100 ${styles.productImg}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default GalleryBox