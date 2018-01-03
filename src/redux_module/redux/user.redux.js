import httpService from 'http_service/service.js';
import { getRedirectToPath } from 'utils/tool.js';

//定义变量

const ERROR_MSG = 'ERROR_MSG';
const ERROR_MSG_CLEAR = 'ERROR_MSG_CLEAR';
const LOAD_DATA = 'LOAD_DATA'; //加载用户数据
const AUTH_SUCCESS = 'AUTH_SUCCESS';  //鉴权成功（登录，注册，更新）
const LOGOUT = 'LOGOUT';

function authSuccess(data){
    let {pwd, ...filterData} = data
    return {
        type: AUTH_SUCCESS,
        payload: filterData
    } 
}
export function loadData(data){
    let {pwd, ...filterData} = data
    return {
        type: LOAD_DATA,
        payload: filterData
    }
}
export function register(postData){
    return (dispatch)=>{
        httpService.user.register(postData).then((res)=>{
            if(res.data.code===200){
                dispatch(authSuccess(res.data.result))
            }else{
                dispatch(errorMsg({msg:res.data.msg}))
            }
        },(err)=>{
            dispatch(errorMsg({msg:err}))
        })
    }
}
export function errorMsg(data){
    return {
        type: ERROR_MSG,
        payload: data
    }
}
export function errMsgClear(data){
    return {
        type: ERROR_MSG_CLEAR,
        payload: data
    }
}
export function update(postData){
    return (dispatch)=>{
        httpService.user.update(postData).then((res)=>{
            if(res.data.code===200){
                dispatch(authSuccess(res.data.result))
            }else{
                dispatch(errorMsg({msg:res.data.msg}))
            }
        },(err)=>{
            dispatch(errorMsg({msg:err}))
        })
    }
}
export function login(postData, success_cb, fail_cb){
    return (dispatch)=>{
        httpService.user.login(postData).then((res)=>{
            if(res.data.code===200){
                dispatch(authSuccess(res.data.result))
                success_cb && success_cb();
            }else{
                dispatch(errorMsg({msg:res.data.msg}))
                fail_cb && fail_cb();
            }
        },(err)=>{
            dispatch(errorMsg({msg:err}))
        })
    }
}
export function logout(){
    return {
        type: LOGOUT
    }
}
const initState = {
    user: '',
    pwd: '',
    type: '',
    msg: '',
    redirectTo: ''
}
export function user(state = initState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, ...action.payload, msg:'', redirectTo: getRedirectToPath(action.payload)}
        case ERROR_MSG:
            return {...state, ...action.payload} 
        case ERROR_MSG_CLEAR:
            return {...state, ...action.payload, msg:''}       
        case LOAD_DATA:
            return {...state, ...action.payload, redirectTo: getRedirectToPath(action.payload)}
        case LOGOUT:
            return {...initState}
        default:
            return state
    }
}