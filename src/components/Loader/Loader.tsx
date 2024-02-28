import { FC } from 'react';
import Lottie from 'lottie-react';
import s from './Loader.module.scss';
import animationData from './loader.json';

export const Loader: FC = () => {

    return (
        <div className={s.content} data-test-id='loader'>
            <Lottie animationData={animationData} />
        </div>
    );
};
