import { FC } from "react";
import { Avatar, Card, Rate, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import s from "./FeedbackCard.module.scss";
import { Feedback } from "@redux/feedbacks/feedbacks.types";

const { Text } = Typography;
export interface FeedbackCardProps {
  id: string;
  fullName: string | null;
  imageSrc: string | null;
  message: string | null;
  rating: number;
  createdAt: string;
}

export const FeedbackCard: FC<Feedback> = ({
  fullName,
  imageSrc,
  message,
  rating,
  createdAt,
}) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return (
    <div className={s.content__wrapper}>
      <Card className={s.content__card} size={"small"} style={{ marginBottom: 16 }}>
        <div className={s.content}>
          <Space
            className={s.content__user}
            align="center"
          >
            <Avatar
              icon={<UserOutlined />}
              src={imageSrc}
            />
            <p>{fullName}</p>
          </Space>
          <Space direction="vertical">
            <Space>
              <Rate disabled defaultValue={rating} />
              <Text
                type="secondary"
                style={{ fontSize: 12 }}
              >{`${day}:${month}:${year}`}</Text>
            </Space>
            <Text type="secondary">{message}</Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};
