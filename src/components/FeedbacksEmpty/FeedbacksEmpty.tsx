import { FC, useState } from "react";
import { Card, Space, Typography, Button } from "antd";
import styles from "./FeedbacksEmpty.module.scss";
import { AddFeedback } from "@components/modals/AddFeedback";

const { Paragraph } = Typography;

export const FeedbacksEmpty: FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddFeedback = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.content}>
      <Card className={styles.content__card} size={"small"}>
        <div className={styles.content}>
          <Space
            className={styles.content__user}
            direction="vertical"
            align="center"
            size={48}
          >
            <h3 className={styles.content__title}>
              Оставьте свой отзыв первым
            </h3>
            <Paragraph type="secondary" style={{ textAlign: 'center' }} className={styles.content__message}>
              Вы можете быть первым, кто оставит отзыв об этом фитнесс
              приложении. Поделитесь своим мнением и опытом с другими
              пользователями, и помогите им сделать правильный выбор.
            </Paragraph>
          </Space>
        </div>
      </Card>
      <Space align={"center"} direction={"vertical"} style={{ width: "100%" }}>
        <Button
          style={{ marginTop: 59 }}
          type="primary"
          data-test-id='write-review'
          onClick={handleAddFeedback}
        >
          Написать отзыв
        </Button>
      </Space>
      <AddFeedback showModal={isModalOpen} handleClose={handleClose} />
    </div>
  );
};
