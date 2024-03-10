import { FC } from 'react';
import { Rate } from 'antd';
import { StarFilled, StarTwoTone } from '@ant-design/icons';
import { COLORS } from '@constants/COLORS';

type AppRateProps = {
    defaultValue?: number;
    disabled?: boolean;
    size?: number;
    onChange?: (value: number) => void;
    value?: number;
};

export const AppRate: FC<AppRateProps> = ({ disabled, defaultValue, size, onChange, value }) => (
    <Rate
        disabled={disabled}
        defaultValue={defaultValue}
        character={({ value, index }) => {
            if (index !== undefined && index >= 0) {
                return value && index < value ? (
                    <StarFilled />
                ) : (
                    <StarTwoTone twoToneColor={COLORS.starColor} />
                );
            }
        }}
        style={{ fontSize: `${size}px` }}
        onChange={onChange}
        value={value}
    />
);
