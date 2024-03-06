export const formatTime = (createdAt: string): string => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}:${month}:${year}`;
};
