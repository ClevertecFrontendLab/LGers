import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import LogoBig from '../../assets/img/logo-big.png';
import LogoSmall from '../../assets/img/logo-small.png';
import {
    CalendarTwoTone,
    HeartTwoTone,
    ProfileOutlined,
    TrophyTwoTone
} from '@ant-design/icons';
import exitIcon from '../../assets/svg/exit.svg'
import { logout } from '@redux/auth/auth.slice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

interface State {
    isShowSidebar: boolean;
}

const links = [
    { id: 1, title: 'Календарь', link: '/', icon: <CalendarTwoTone /> },
    { id: 2, title: 'Тренировки', link: '/', icon: <HeartTwoTone /> },
    { id: 3, title: 'Достижения', link: '/', icon: <TrophyTwoTone /> },
    { id: 4, title: 'Профиль', link: '/', icon: <ProfileOutlined /> },
];

export const Sidebar: FC = () => {
    const [state, setState] = useState<State>({
        isShowSidebar: false,
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setState((prev: State) => ({ ...prev, isShowSidebar: !prev.isShowSidebar }));
    };

    const onExit = () => {
        dispatch(logout());
        navigate('/auth');
    };

    const navLinks = links
        .map((item) =>
            <li className={styles.nav__li} key={item.id}>
                <Link to={item.link} className={styles.nav__link}>
                    <span className={styles.nav__icon}>
                        {item.icon}
                    </span>
                    <span className={!state.isShowSidebar ? styles.nav_hideTitle : styles.link__title}>
                        {item.title}
                    </span>
                </Link>
            </li>
        );

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebar__DTBtn} data-test-id='sider-switch'>
                <button className={styles.toggleBtn} onClick={toggleSidebar} />
            </div>
            <div className={styles.sidebar__MobileBtn} data-test-id='sider-switch-mobile'>
                <button className={styles.toggleBtn} onClick={toggleSidebar} />
            </div>

            <div className={!state.isShowSidebar ? styles.hideMobile : styles.showMobile}>
                <Link to='/' className={styles.logo__img}>
                    <img src={state.isShowSidebar ? LogoBig : LogoSmall} alt='Cleverfit' />
                </Link>
                <nav className={styles.nav}>
                    <ul className={styles.nav__links}>
                        {navLinks}
                    </ul>
                </nav>
                <div className={styles.exit}>
                    <button className={styles.exit__btn} onClick={onExit}>
                        <img src={exitIcon} alt='exit'
                            className={styles.exit__icon}
                        />
                        <span
                            className={!state.isShowSidebar ? styles.nav_hideTitle : styles.link__title}>Выход
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
};
