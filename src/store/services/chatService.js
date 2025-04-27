import API from "./api";

export const postChat = async (message) => {
    const response = await API.post('/v1/chat', message);
    return response.data;
};