import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { PATHS } from '@constants/PATHS';
import settingsIcon from '../../assets/svg/settings.svg';
import styles from './Header.module.scss';

export const Header = () => {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <Breadcrumbs />
            {location.pathname === PATHS.main.path
                && <div className={styles.header__content}>
                    <h1 className={styles.header__h1}>
                        <span>
                            Приветствуем тебя в CleverFit — приложении,
                        </span>
                        <span>
                            которое поможет тебе добиться своей мечты!
                        </span>
                    </h1>
                    <div className={styles.header__settings}>
                        <button className={styles.button}>
                            <img className={styles.button__icon}
                                src={settingsIcon} alt='Settings' />
                            <span className={styles.button__text}>Настройки</span>
                        </button>
                    </div>
                </div>
            }
        </header>
    );
};
