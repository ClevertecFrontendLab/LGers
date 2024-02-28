import s from './Button.module.scss';

export const Button = ({ btnText, btnIcon, color }) => {

    return (
        <button
            className={s.btn}
            style={{ color }}
        >
            {btnIcon && <span>{btnIcon}</span>}
            <span>{btnText}</span>
        </button>
    );
};
