import { axiosInstance } from "../utils/axios";
import { getAuthHeader } from "../utils/authTools";

export const summarizeTranscript = async (request) => {
    let response = await axiosInstance.patch(
        `/summarize/${request.id}`,
        request,
        getAuthHeader()
    );
    return response.data;
};