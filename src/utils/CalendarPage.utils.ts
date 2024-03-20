import { Training, TrainingList } from '@redux/training/training.types';
import { BadgeProps } from 'antd';
import moment from 'moment';
import type { Moment } from 'moment';

type GetListData = {
    training?: Training;
    trainings?: Training[];
};

export const getExerciseType = (value: string | undefined): BadgeProps['status'] => {
    switch (value) {
        case 'Ноги':
            return 'error';

        case 'Руки':
            return 'processing';

        case 'Силовая':
            return 'default';

        case 'Спина':
            return 'success';

        case 'Грудь':
            return 'warning';

        default:
            return 'default';
    }
};

export const getListData = ({ trainings }: GetListData) => {
    const listData = trainings?.map((item) => {
        return { id: item._id, type: getExerciseType(item.name), content: item.name };
    });

    return listData || [];
};

export const _getListData = ({ training }: GetListData) => {
    const listData = training?.exercises.map((item) => {
        return { type: getExerciseType(item.name), content: item.name };
    });

    return listData || [];
};

export const getDate = (value: string | number): string => {
    const date = new Date(value);
    if (value) {
        const formattedDate =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            '-' +
            date.getDate().toString().padStart(2, '0');
        return formattedDate.toString();
    }

    return '';
};

type Option = {
    value: string | number;
    label: string;
    children?: Option[];
    key?: string | number;
};

type GetTraineeOptions = {
    currentTrainings: Training[];
    trainingList: TrainingList[];
};

export const getTraineeOptions = ({
    currentTrainings,
    trainingList,
}: GetTraineeOptions): Option[] => {
    const existedOptions = currentTrainings.map((item) => item.name);

    const options = trainingList.filter((item) => {
        return !existedOptions.includes(item.name);
    });

    const options2: Option[] = options.map((item) => {
        return { value: item.name, label: item.name };
    });

    return options2;
};

type GetUpdatedTrainings = {
    previousTrainings: Training[];
    updatedTraining: Training;
};

export const getFormattedDate = (date: Moment | string | number | undefined): string => {
    return moment(date).format('YYYYDDMM');
};

export const getUpdatedTrainings = ({
    previousTrainings,
    updatedTraining,
}: GetUpdatedTrainings): Training[] => {
    const updatedDate = getFormattedDate(updatedTraining.date);

    const isNewTrainee = previousTrainings.find((item) => {
        const itemDate = getFormattedDate(updatedTraining.date);
        return updatedDate === itemDate && item.name === updatedTraining.name;
    });

    if (!isNewTrainee) {
        return [...previousTrainings, updatedTraining];
    }

    const curTr = previousTrainings.map((item) => {
        const itemDate = getFormattedDate(updatedTraining.date);

        if (updatedDate === itemDate && item.name === updatedTraining.name) {
            return updatedTraining;
        }

        return item;
    });

    return curTr;
};

type GetIsUpdatedTraining = {
    updatedTrainings: Training[];
    selectedTraining: Training | undefined;
};

export const getIsUpdatedTraining = ({
    updatedTrainings,
    selectedTraining,
}: GetIsUpdatedTraining): boolean => {
    const isUpdatedTraining = updatedTrainings.find((item) => {
        const updatedDate = getFormattedDate(selectedTraining?.date);
        const itemDate = getFormattedDate(selectedTraining?.date);
        return updatedDate === itemDate && item.name === selectedTraining?.name;
    });

    return !!isUpdatedTraining;
};

type GetCurrentTrainings = {
    trainings: Training[];
    updatedTrainings: Training[];
    date: string | Moment;
};

export const getCurrentTrainings = ({
    trainings,
    updatedTrainings,
    date,
}: GetCurrentTrainings): Training[] => {
    const currentDate = moment(date).format('YYYY-MM-DD');
    const currentTrainings = trainings.filter((item) => getDate(item.date) === currentDate);
    const cur = currentTrainings.map((item) => {
        if (getIsUpdatedTraining({ selectedTraining: item, updatedTrainings })) {
            return updatedTrainings.filter((item) => getDate(item.date) === currentDate)[0];
        }

        return item;
    });

    return cur;
};

type GetNewTrainingCount = {
    trainings: Training[];
    selectedTraining: Training | undefined;
    date?: Moment;
};

export const getNewTrainingCount = ({
    trainings,
    selectedTraining,
}: GetNewTrainingCount): number => {
    const count = trainings.filter(
        (item) =>
            item._id &&
            moment(item.date).format('YYYYMMDD') ===
                moment(selectedTraining?.date).format('YYYYMMDD)'),
    );
    return count.length;
};
