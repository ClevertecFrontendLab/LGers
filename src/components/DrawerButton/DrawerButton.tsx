import { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type DrawerButtonProps = {
    onClick?: () => void;
    children?: JSX.Element | JSX.Element[] | string;
};

export const DrawerButton: FC<DrawerButtonProps> = ({ children, onClick }) => (
    <Button
        icon={<PlusOutlined />}
        block
        style={{
            textAlign: 'left',
            background: 'rgb(240, 240, 240)',
        }}
        size='large'
        type='link'
        onClick={onClick}
        // {...rest}
    >
        {children}
    </Button>
);
