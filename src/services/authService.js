import { axiosInstance } from "../utils/axios";
import { getAuthHeader } from "../utils/authTools";

export const createUser = async (request) => {
    let response = await axiosInstance.post(
        `/auth/signup`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const signIn = async (request) => {
    let response = await axiosInstance.post(
        `/auth/signin`,
        request
    );
    return response.data;
};

export const verifyTokenAndGetDetails = async () => {
    let response = await axiosInstance.get(
        `/auth/verifytoken`,
        getAuthHeader()
    );
    return response.data;
};
