export type UserCredentials = {
    email: string;
    password: string;
};

export type FormValues = {
    email: string;
    password: string;
    remember: boolean;
};

export type UserResponse = {
    user: UserCredentials;
    accessToken: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type CheckEmailResponse = {
    data: {
        email: string;
        message: string;
    };
    error?: {
        data?: {
            error?: string;
            message?: string;
            statusCode?: number;
        };
        status?: number;
    };
};

export type Feedback = {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
};
