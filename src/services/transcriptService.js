import { axiosInstance } from "../utils/axios";
import { getAuthHeader } from "../utils/authTools";

export const getAllTranscripts = async (request) => {
    let response = await axiosInstance.get(
        `/transcription/all?page=${request.page}&pageSize=${request.pageSize}`,
        getAuthHeader()
    );
    return response.data;
};

export const getTransriptDetailByID = async (request) => {
    let response = await axiosInstance.get(
        `/transcription/${request}`,
        getAuthHeader()
    );
    return response.data;
};

export const deleteTransriptByID = async (request) => {
    let response = await axiosInstance.delete(
        `/transcription/${request}`,
        getAuthHeader()
    );
    return response.data;
};

export const udpateTranscriptRetention = async (request) => {
    let response = await axiosInstance.patch(
        `/transcription/delete-days`,
        request,
        getAuthHeader()
    );
    return response.data;
};

export const highlightTranscript = async (request) => {
    let response = await axiosInstance.patch(
        `/transcription/highlight/${request.id}`,
        request,
        getAuthHeader()
    );
    return response.data;
};