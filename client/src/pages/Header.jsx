import styles from "./Header.module.css";
import {useNavigate} from 'react-router'

const Header = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/profile");
    }
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>MyMemories</h1>

      <button className={styles.profileBtn} onClick={handleClick}>Profile</button>
    </header>
  );
};

export default Header;
