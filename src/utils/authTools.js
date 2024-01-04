export const getToken = () =>
    localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN);

export const getAuthHeader = () => {
    return { headers: { Authorization: `Bearer ${getToken()}` } };
};

export const getAuthHeaderContentTypeHeader = () => {
    return {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data",
        },
    };
};
