import s from './Header.module.scss';
import { useLocation } from 'react-router-dom';
import settingsIcon from '../../assets/svg/settings.svg';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { PATHS } from '@constants/PATHS';

export const Header = () => {
    const location = useLocation()
    return (
        <header className={s.header}>
            <Breadcrumbs />
            {location.pathname === PATHS.main.path
                && <div className={s.header__content}>
                    <h1 className={s.header__h1}>
                        <span>
                            Приветствуем тебя в CleverFit — приложении,
                        </span>
                        <span>
                            которое поможет тебе добиться своей мечты!
                        </span>
                    </h1>
                    <div className={s.header__settings}>
                        <button className={s.button}>
                            <img className={s.button__icon}
                                src={settingsIcon} alt='Settings' />
                            <span className={s.button__text}>Настройки</span>
                        </button>
                    </div>
                </div>
            }
        </header>
    );
};
