import { FC } from 'react';
import { Tag } from 'antd';

type DrawerTagProps = {
    children?: JSX.Element | JSX.Element[] | string;
};

export const DrawerTag: FC<DrawerTagProps> = ({ children }) => (
    <Tag
        style={{
            border: 'none',
            background: 'rgb(240, 240, 240)',
            width: '100%',
            padding: '2px 8px',
        }}
    >
        {children}
    </Tag>
);
