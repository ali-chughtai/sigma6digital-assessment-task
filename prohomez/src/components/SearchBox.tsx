import { FaSearch } from 'react-icons/fa'
import styles from '../style/SearchBox.module.css'

export default function SearchBox() {
  return (
        <div className={`${styles.inputBox}`}>
            <input type="text" className={`${styles.inputText}`} placeholder="Search here..." name="search" />
            <button type="submit" className={`${styles.searchButton}`}>
                <FaSearch />
            </button>
        </div>
  )
}
