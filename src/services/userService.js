import { axiosInstance } from "../utils/axios";
import { getAuthHeader } from "../utils/authTools";

export const resetPassword = async (request) => {
    let response = await axiosInstance.patch(
        `/user/updatepassword`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const getAllUsers = async () => {
    let response = await axiosInstance.get(
        `/user/all`,
        getAuthHeader()
    );
    return response.data;
};

export const updatedUserStatus = async (request) => {
    let response = await axiosInstance.patch(
        `/user/update-user-status`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const changeAdminStatus = async (request) => {
    let response = await axiosInstance.patch(
        `/user/change-admin-status`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const updateUser = async (request) => {
    let response = await axiosInstance.patch(
        `/user`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const deleteUser = async (request) => {
    let response = await axiosInstance.delete(
        `/user/${request.email}`,
        getAuthHeader()
    );
    return response.data;
};