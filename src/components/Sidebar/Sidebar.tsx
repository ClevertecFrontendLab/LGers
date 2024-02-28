import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './Sidebar.module.scss';
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
        console.log('exit');
    };
    const navLinks = links.map((item) => {
        return (
            <li className={s.nav__li} key={item.id}>
                <Link to={item.link} className={s.nav__link}>
                    <span className={s.nav__icon}>
                        {item.icon}
                    </span>
                    <span className={!state.isShowSidebar ? s.nav_hideTitle : s.link__title}>
                        {item.title}
                    </span>
                </Link>
            </li>
        );
    });

    return (
        <aside className={s.sidebar}>
            <div className={s.sidebar__DTBtn} data-test-id='sider-switch'>
                <button className={s.toggleBtn} onClick={toggleSidebar} />
            </div>
            <div className={s.sidebar__MobileBtn} data-test-id='sider-switch-mobile'>
                <button className={s.toggleBtn} onClick={toggleSidebar} />
            </div>

            <div className={!state.isShowSidebar ? s.hideMobile : s.showMobile}>
                <Link to='/' className={s.logo__img}>
                    <img src={state.isShowSidebar ? LogoBig : LogoSmall} alt='Cleverfit' />
                </Link>
                <nav className={s.nav}>
                    <ul className={s.nav__links}>
                        {navLinks}
                    </ul>
                </nav>
                <div className={s.exit}>
                    <button className={s.exit__btn} onClick={onExit}>
                        <img src={exitIcon} alt='exit'
                             className={s.exit__icon}
                        />
                        <span
                            className={!state.isShowSidebar ? s.nav_hideTitle : s.link__title}>Выход
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
};
