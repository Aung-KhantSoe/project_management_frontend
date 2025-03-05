import * as actionTypes from "./ActionType";
import { api } from "@/config/api"

export const sendMessage = (messageData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.SEND_MESSAGE_SUCCESS });
        try {
            const response = await api.post("/api/messages/send",
                messageData
            );
            dispatch({
                type: actionTypes.SEND_MESSAGE_SUCCESS, message: response.data,
            });
            console.log('message sent',response.data)
        }
        catch (error) {
            dispatch({
                type: actionTypes.SEND_MESSAGE_FAILURE,
                error: error.message,
            });
        }
    };
};


export const fetchChatByProject = (projectId) =>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_CHAT_BY_PROJECT_REQUEST});
        try {
            const response = await api.get(
                `/api/projects/${projectId}/chat`
            );
            console.log("fetch chat",response.data)
            dispatch({
                type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
                chat: response.data,
            })
        } catch (error) {
            console.log("error -- ",error)
            dispatch({
                type: actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE,
                error:error.message
            })
        }
    }
}
export const fetchChatMessages = (projectId) =>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_CHAT_MESSAGES_REQUEST});
        try {
            const response = await api.get(
                `/api/messages/chat/${projectId}`
            );
            console.log("fetch messages",response.data)
            dispatch({
                type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS,
                projectId,
                messages: response.data,
            })
        } catch (error) {
            console.log("error -- ",error)
            dispatch({
                type: actionTypes.FETCH_CHAT_MESSAGES_FAILURE,
                error:error.message
            })
        }
    }
}

