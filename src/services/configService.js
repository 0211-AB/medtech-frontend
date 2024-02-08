import { axiosInstance } from "../utils/axios";
import { getAuthHeader } from "../utils/authTools";

export const updateConfig = async (request) => {
    let response = await axiosInstance.patch(
        `/config/update`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const getConfig = async (request) => {
    let response = await axiosInstance.get(
        `/config`,
        getAuthHeader()
    );
    return response.data;
};