import { ApiError } from "@redux/auth/auth.types";

export type Exercise = {
    _id?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type Training = {
    name: string;
    date: string | number;
    isImplementation: boolean;
    parameters: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: [];
    };
    exercises: Exercise[];
    _id?: string;
    userId?: string;
};

export type TrainingList = {
    name: string;
    key: string;
};

export type TrainingsState = {
    isFetching: boolean;
    trainingList: TrainingList[];
    trainings: Training[];
    trainingsError: ApiError | null | undefined;
    hasError: boolean;
};
