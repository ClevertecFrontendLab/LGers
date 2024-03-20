import { FC } from 'react';
import { Wrapper } from '@components/Wrapper';
import { Sidebar } from '@components/Sidebar';
import { Header } from '@components/Header';
import styles from './AppWrapper.module.scss';

type AppWrapperProps = {
    children: JSX.Element | JSX.Element[];
}

export const AppWrapper: FC<AppWrapperProps> = ({ children }) =>
    <Wrapper>
        <div className={styles.main__page}>
            <Sidebar />
            <div className={styles.pageContainer}>
                <Header />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    </Wrapper>
