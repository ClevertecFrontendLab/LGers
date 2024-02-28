import s from './AuthTabs.module.scss';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FC } from 'react';

type Props = {
    activeTab: 'auth' | 'registration',
}
export const AuthTabs: FC<Props> = ({ activeTab }) => {

    return (
        <>
            <div className={s.tabs}>
                <Link
                    to={'/auth'}
                    className={activeTab === 'auth' ? s.tabs__linkBtnActive : s.tabs__linkBtn}>
                    <Button
                        type="link"
                        block
                    >
                        Вход
                    </Button>
                </Link>
                <Link
                    to={'/auth/registration'}
                    className={activeTab === 'registration' ? s.tabs__linkBtnActive : s.tabs__linkBtn}
                >
                    <Button type="text" size="large" block
                    >
                        Регистрация
                    </Button>
                </Link>
            </div>
        </>
    );
};
