import { FC } from 'react';
import s from './Footer.module.scss';
import { Button } from '@components/Button';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PATHS } from '@constants/PATHS';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Loader } from '@components/Loader';
import { cleverFitApi } from '@redux/api/api';

export const Footer: FC = () => {
    const { isFetching } = useAppSelector((state) => state.feedbacks);
    const [getFeedbacks] = cleverFitApi.useLazyGetFeedbacksQuery();

    const handleFeedbacksClick = async () => {
        await getFeedbacks(null);
    };

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
            <button className={s.footer__btn} onClick={handleFeedbacksClick}>
                <Link to={PATHS.feedbacks.path} data-test-id='see-reviews'>
                    Смотреть отзывы
                </Link>
            </button>
            {isFetching && <Loader />}
        </footer>
    );
};
