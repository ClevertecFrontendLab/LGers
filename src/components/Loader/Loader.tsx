import { FC } from 'react';
import Lottie from 'lottie-react';
import styles from './Loader.module.scss';
import animationData from './loader.json';

export const Loader: FC = () =>
    <div className={styles.content} data-test-id='loader'>
        <Lottie animationData={animationData} />
    </div>
