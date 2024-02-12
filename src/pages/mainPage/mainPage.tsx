import { Wrapper } from "@components/Wrapper";
import { Sidebar } from "@components/Sidebar";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import s from './mainPage.module.scss';

export const MainPage = () => {

    return (
        <Wrapper>
            <div className={s.main__page}>
                <Sidebar/>
                <div className={s.pageContainer}>
                    <Header/>
                    <main className={s.main}>
                        <div>
                            main
                        </div>
                    </main>
                    <Footer/>
                </div>
            </div>
        </Wrapper>
    );
};
