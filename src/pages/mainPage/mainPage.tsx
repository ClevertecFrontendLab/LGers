import { Wrapper } from '@components/Wrapper';
import { Sidebar } from '@components/Sidebar';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { MainContent } from '@pages/mainPage/components/MainContent';
import styles from './mainPage.module.scss';

export const MainPage = () => {
    return (
        <Wrapper>
            <div className={styles.main__page}>
                <Sidebar />
                <div className={styles.pageContainer}>
                    <Header />
                    <main className={styles.main}>
                        <MainContent />
                    </main>
                    <Footer />
                </div>
            </div>
        </Wrapper>
    );
};
