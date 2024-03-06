import styles from './Logo.module.scss';
import logo from '../../../../assets/img/logo.png';

export const Logo = () =>
    <div>
        <img className={styles.logo} src={logo} alt="CleverFit" />
    </div>
