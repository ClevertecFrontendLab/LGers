import styles from './Button.module.scss';

export const Button = ({ btnText, btnIcon, color }) =>
    <button
        className={styles.btn}
        style={{ color }}
    >
        {btnIcon && <span>{btnIcon}</span>}
        <span>{btnText}</span>
    </button>
