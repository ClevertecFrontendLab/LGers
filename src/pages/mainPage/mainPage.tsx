import { Wrapper } from "@components/Wrapper";
import { Sidebar } from "@components/Sidebar";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import styles from './mainPage.module.css';

export const MainPage = () => {

    return (
        <Wrapper>
            <Sidebar/>
            <div className={styles.pageContainer}>
                <Header/>
                <main className={styles.main}>
                    <div>
                        main
                    </div>
                </main>
                <Footer/>
            </div>
        </Wrapper>
    );
};
