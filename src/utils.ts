export const formatName = (name: string) => {
    return name[0].toUpperCase() + name.slice(1);
};

export const getRun = (runName: string) => {
    return JSON.parse(localStorage.getItem(runName) as string);
};
