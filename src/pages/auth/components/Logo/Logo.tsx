import s from './Logo.module.scss';
import logo from '../../../../assets/img/logo.png';

export const Logo = () => {

    return (
        <div>
            <img className={s.logo} src={logo} alt="CleverFit" />
        </div>
    );
};
