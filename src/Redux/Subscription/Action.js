import * as actionTypes from "./ActionTypes"
import { api } from "@/config/api"

export const getUserSubscription = (jwt)=>{
    return async (dispatch)=>{
        dispatch({type: actionTypes.GET_USER_SUBSCRIPTION_REQUEST});
        try {
            const response = await api.get(`/api/subscriptions/user`,{
                headers:{
                    "Authorization":`Bearer ${jwt}`
                }
            });
            console.log("fetch issues",response.data);
            dispatch({
                type: actionTypes.GET_USER_SUBSCRIPTION_SUCCESS,
                issues: response.data
            });
            console.log("users subscription ",response.data)
        } catch (error) {
            dispatch({
                type: actionTypes.GET_USER_SUBSCRIPTION_FAILURE,
                error: error.message
            })
        }
    }
}
export const upgradeSubscription = ({planType})=>{
    return async (dispatch)=>{
        dispatch({type: actionTypes.UPGRADE_SUBSCRIPTION_REQUEST});
        try {
            const response = await api.get(`/api/subscriptions/upgrade`,null,{
                params:{
                    planType:planType,
                }
            });
            console.log("fetch issues",response.data);
            dispatch({
                type: actionTypes.UPGRADE_SUBSCRIPTION_SUCCESS,
                payload: response.data
            });
            console.log("upgraded subscription ",response.data)
        } catch (error) {
            console.log(error.response.data)
            dispatch({
                type: actionTypes.UPGRADE_SUBSCRIPTION_FAILURE,
                error: error.message
            })
        }
    }
}