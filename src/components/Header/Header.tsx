import s from './Header.module.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.breadcrumbs}>
                <Link to='/'>Главная</Link>
            </div>
            <div className={s.header__content}>
                <h1 className={s.header__h1}>
                    <span>
                        Приветствуем тебя в CleverFit — приложении,
                    </span>
                    <span>
                        которое поможет тебе добиться своей мечты!
                    </span>
                </h1>
                <div className={s.header__settings}>
                    <button  className={s.button}>
                        <img className={s.button__icon}src="../../../public/assets/svg/settings.svg" alt="Settings" />
                        <span className={s.button__text}>Настройки</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
