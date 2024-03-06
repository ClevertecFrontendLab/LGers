import { FC } from 'react';
import { Wrapper } from '@components/Wrapper';
import { Sidebar } from '@components/Sidebar';
import { Header } from '@components/Header';
import s from './AppWrapper.module.scss';

interface AppWrapperProps {
    children: JSX.Element | JSX.Element[];
};
export const AppWrapper: FC<AppWrapperProps> = ({ children }) => {

    return (
        <Wrapper>
            <div className={s.main__page}>
                <Sidebar/>
                <div className={s.pageContainer}>
                    <Header/>
                    <main className={s.main}>
                        {children}
                    </main>
                </div>
            </div>
        </Wrapper>
    );
};
