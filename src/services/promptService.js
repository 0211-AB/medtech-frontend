import { axiosInstance } from "../utils/axios";
import { getAuthHeader } from "../utils/authTools";

export const createPrompt = async (request) => {
    let response = await axiosInstance.post(
        `/prompt`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const getAllPrompts = async () => {
    let response = await axiosInstance.get(
        `/prompt/all`,
        getAuthHeader()
    );
    return response.data;
};

export const updatePrompt = async (request) => {
    let response = await axiosInstance.patch(
        `/prompt/update`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const deletePromptByID = async (request) => {
    let response = await axiosInstance.delete(
        `/prompt/${request}`,
        getAuthHeader()
    );
    return response.data;
};