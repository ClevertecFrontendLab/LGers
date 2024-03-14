import { Training } from '@redux/training/training.types';

type GetListData = {
    training?: Training | undefined;
    trainings?: Training[] | undefined;
};

const getExerciseType = (value: string): string => {
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
        return { type: getExerciseType(item.name), content: item.name };
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
