//聊天用户 
import httpService from 'http_service/service.js';
import io from 'socket.io-client';

const io_url = window.location.hostname+':3002';
const socket = io(io_url);                       //可以，推荐这种方式吧。

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
    chatMsg: [],
    users:[],
    unread: 0
}

function msgList(msgs, users, userId){
    return {
        type: MSG_LIST,
        payload: {msgs, users, userId}
    }
}
function msgRecv(data, userId){
    return {
        type: MSG_RECV,
        payload: data,
        userId: userId
    }
}
function msgRead({targetId,myId,readedNum}){
    return {
        type: MSG_READ,
        readedNum: readedNum,
        targetId: targetId,
        myId: myId
    }
}
export function getMsgList(type){
    return (dispatch,getState)=>{
        httpService.user.chatlist({type}).then((res)=>{
            // console.log('getState',getState())
            const myId = getState().user._id;
            dispatch(msgList(res.data.result, res.data.users, myId))
        },(err)=>{
           console.log(err)
        })
    }
}
export function recvMsg(){
    return (dispatch, getState)=>{
        socket.on('recvMsg',(data)=>{
            const myId = getState().user._id;
            // console.log('data._doc',data._doc)            
            if(data._doc.from===myId||data._doc.to===myId){
                dispatch(msgRecv(data._doc, myId)) 
            }                       
        })
    }
}
export function sendMsg({from, to, msg}){
    return dispatch=>{
        // console.log({from, to, msg})
        socket.emit('sendMsg',{from, to, msg});
    }
}
//读取消息 提醒消息数归0
export function readMsg({from, to}){
    //from 对方
    //to 自己
    const targetId = from;
    return (dispath, getState)=>{
        //发送post 接口
        const myId = getState().user._id
        const postData = {
            from: targetId
        }
        httpService.user.readMsg(postData).then((res)=>{
           dispath(msgRead({targetId, myId, readedNum:res.data.readedNum}))
        },(err)=>{
           console.log(err)
        })
    }
}

//reducer
export function chat(state = initState, action){
    switch(action.type){
        case MSG_LIST:
            return {...state, chatMsg: action.payload.msgs, users:action.payload.users, unread: action.payload.msgs.filter(v=>(!v.readed&&v.to===action.payload.userId)).length}
        case MSG_RECV:
            const n = action.userId===action.payload.to?1:0;
            return {...state, chatMsg: [...state.chatMsg, action.payload], unread:state.unread+n }
        case MSG_READ:
            const readedNum = action.readedNum;
            return {...state, 
                    chatMsg:state.chatMsg.map((v)=>{
                                if(v.from===action.targetId && v.to===action.myId){
                                    v.readed = true
                                }
                                return v
                            }), 
                    unread: state.unread-readedNum}
        default:
            return state
    }
}