import { axiosInstance } from "../utils/axios";
import { getAuthHeader } from "../utils/authTools";

export const uploadMedia = async (request) => {
    let response = await axiosInstance.post(
        `/upload`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const getuploadMedia = async () => {
    let response = await axiosInstance.get(
        `/upload/all`,
        getAuthHeader()
    );
    return response.data;
};

export const getUploadDetailByID = async (request) => {
    let response = await axiosInstance.get(
        `/upload/${request}`,
        getAuthHeader()
    );
    return response.data;
};

export const deleteuploadMedia = async (request) => {
    let response = await axiosInstance.delete(
        `/upload/${request}`,
        getAuthHeader()
    );
    return response.data;
};

export const highlightUpload = async (request) => {
    let response = await axiosInstance.patch(
        `/upload/highlight/${request.id}`,
        request,
        getAuthHeader()
    );
    return response.data;
};