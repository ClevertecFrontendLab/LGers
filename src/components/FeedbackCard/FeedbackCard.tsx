import { FC } from 'react';
import { Avatar, Card, Rate, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Feedback } from '@redux/feedbacks/feedbacks.types';
import { formatTime } from '@utils/index';
import { AppRate } from '@components/AppRate/AppRate';
import styles from './FeedbackCard.module.scss';

const { Text } = Typography;
export type FeedbackCardProps = {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
};

export const FeedbackCard: FC<Feedback> = ({ fullName, imageSrc, message, rating, createdAt }) => (
    <div className={styles.content__wrapper}>
        <Card className={styles.content__card} size={'small'} style={{ marginBottom: 16 }}>
            <div className={styles.content}>
                <Space className={styles.content__user} align='center'>
                    <Avatar icon={<UserOutlined />} src={imageSrc} />
                    <p>{fullName}</p>
                </Space>
                <Space direction='vertical'>
                    <Space align='center'>
                        <AppRate disabled defaultValue={rating} size={14} />
                        <Text type='secondary' style={{ fontSize: 12 }}>
                            {formatTime(createdAt)}
                        </Text>
                    </Space>
                    <Text type='secondary'>{message}</Text>
                </Space>
            </div>
        </Card>
    </div>
);
