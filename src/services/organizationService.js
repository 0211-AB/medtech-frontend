import { axiosInstance } from "../utils/axios";
import { getAuthHeader } from "../utils/authTools";

export const createOrganization = async (request) => {
    let response = await axiosInstance.post(
        `/organization/create`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const updateOrganization = async (request) => {
    let response = await axiosInstance.patch(
        `/organization/update`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const allOrganizations = async () => {
    let response = await axiosInstance.get(
        `/organization`,
        getAuthHeader()
    );
    return response.data;
};

export const addAdminToOrg = async (request) => {
    let response = await axiosInstance.post(
        `/organization/add-admin`,
        request,
        getAuthHeader()
    );
    return response.data;
};
