export type AppCardProps = {
    id: number;
    title: string;
    btnText: string;
    btnIcon: JSX.Element;
    link: string;
    dataTestId?: string;
    onClick?: () => void;
};
