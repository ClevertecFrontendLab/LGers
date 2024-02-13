import s from './Footer.module.scss';
import { Button } from '@components/Button';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

export const Footer = () => {

    return (
        <footer className={s.footer}>
            <div className={s.app}>
                <div className={s.app__txt}>
                    <p className={s.app__txt_primary}>Скачать на телефон</p>
                    <p className={s.app__txt_secondary}>Доступно в PRO-тарифе</p>
                </div>
                <div className={s.app__btns}>
                    <Button
                        btnText={'Android OS'}
                        btnIcon={<AndroidFilled />}
                        color={'#262626'}
                    />
                    <Button
                        btnText={'Apple IOS'}
                        btnIcon={<AppleFilled />}
                        color={'#262626'}
                    />
                </div>
            </div>
            <button className={s.footer__btn}>
                Смотреть отзывы
            </button>
        </footer>
    );
};
