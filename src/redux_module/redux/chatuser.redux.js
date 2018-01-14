//聊天用户 
import httpService from 'http_service/service.js';

const USER_LIST = 'USER_LIST';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
    userList: []
}

function userList(data){
    return {
        type: USER_LIST,
        payload: data
    }
}
export function getUserList(type){
    return (dispatch)=>{
        httpService.user.list({type}).then((res)=>{
            dispatch(userList(res.data))
        },(err)=>{
            dispatch(errorMsg({msg: '服务器出错'}))
        })
    }
}
export function errorMsg(data){
    return {
        type: ERROR_MSG,
        payload: data
    }
}
//reducer
export function chatuser(state = initState, action){
    switch(action.type){
        case USER_LIST:
            return {...state, userList:action.payload, msg:''}
        case ERROR_MSG:
            return {...state, ...action.payload}       
        default:
            return state
    }
}