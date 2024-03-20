import { EditOutlined } from '@ant-design/icons';
import { Badge, BadgeProps, Button, Space, Typography } from 'antd';
import { BaseType } from 'antd/lib/typography/Base';
import { FC } from 'react';

type TrainingBadgeProps = {
    status: BadgeProps['status'];
    text: string | JSX.Element;
    id?: number | string;
    type?: BadgeProps['status'];
    content?: string | JSX.Element;
    value?: string;
    onEditClick?: () => void;
    disabled?: boolean;
};

export const TrainingBadge: FC<TrainingBadgeProps> = ({
    id,
    value,
    status,
    text,
    onEditClick,
    disabled,
}) => {
    console.log('TrainingBadge', value);

    const dataTestId = `modal-update-training-edit-button${id}`;
    return (
        <Space
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Badge
                status={status}
                text={<Typography.Text disabled={disabled}>{text}</Typography.Text>}
                size='small'
            />
            <Button
                type='link'
                onClick={onEditClick}
                disabled={disabled}
                data-test-id={`modal-update-training-edit-button${id}`}
                // data-test-id={`modal-update-training-edit-button0`}
            >
                <EditOutlined />
            </Button>
        </Space>
    );
};
