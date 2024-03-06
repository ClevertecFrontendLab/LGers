import { useEffect, useState } from "react";
import { Button } from "antd";
import { FeedbackCard } from "../../components/FeedbackCard";
import { FeedbacksEmpty } from '@components/FeedbacksEmpty';
import { AppWrapper } from "@components/AppWrapper";
import s from './Feedbacks.module.scss';
import { AddFeedback } from "@components/modals/AddFeedback";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { Feedback } from "@redux/feedbacks/feedbacks.types";
import { Loader } from "@components/Loader";
import { FeedbackSuccess } from "@components/modals/FeedbackSuccess";
import { logout } from "@redux/auth/auth.slice";
import { FeedbackError500 } from "@components/modals/FeedbackError500";
import { useLazyGetFeedbacksQuery } from "@redux/api/api";
import { FeedbackErrorPost } from "@components/modals/FeedbackErrorPost";

export interface ModalProps {
    isModalOpenProp: boolean;
};

export const Feedbacks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { feedbacks, isFetching, error } = useAppSelector((state) => state.feedbacks);
    const dispatch = useAppDispatch();
    const [getFeedbacks] = useLazyGetFeedbacksQuery();

    const handleAddFeedback = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const [isSeeFeedbacks, setIsSeeFeedbacks] = useState(false);

    const handleFeedbacks = () => {
        setIsSeeFeedbacks(!isSeeFeedbacks);
    };

    const feedbacksData = isSeeFeedbacks ? feedbacks : feedbacks.slice(0, 4);

    const feedbacksMapped = feedbacksData.map((item: Feedback) => {
        return (
            <FeedbackCard key={item.id} {...item} />
        )
    });

    useEffect(() => {
        if (error?.status === 403) {
            dispatch(logout());
        }
    }, [error]);

    useEffect(() => {
        if (!feedbacks.length) {
            getFeedbacks(null);
        }
    }, [feedbacks]);

    return (
        <AppWrapper>
            {feedbacks.length ?
                <div className={s.feedbacks}>
                    <div
                        className={s.feedbacks__content}
                    >
                        {feedbacksMapped}
                    </div>

                    <div className={s.feedbacks__footer}>
                        <Button type="primary" onClick={handleAddFeedback} data-test-id='write-review'>
                            Написать отзыв
                        </Button>
                        <Button type="link" onClick={handleFeedbacks} data-test-id='all-reviews-button'>
                            {isSeeFeedbacks ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                        </Button>
                    </div>
                </div>
                : <FeedbacksEmpty />
            }
            <AddFeedback showModal={isModalOpen} handleClose={handleClose} />
            <FeedbackErrorPost showModal={handleAddFeedback} />
            <FeedbackSuccess />
            <FeedbackError500 />
            {isFetching && <Loader />}
        </AppWrapper>
    );
};
