//常用方法

//redirectTo  
export function getRedirectToPath({type, avatar}){
    let url = '';
    if(type==='genius'){
        url = '/genius'
    }else{
        url = '/boss'
    }
    if(!avatar){
        url = url+'info'
    }
    return url
}
//获取chatId
export function getChatId(myId, somebodyId){
    return [myId, somebodyId].sort().join('_')
}

const tool = {
    getRedirectToPath,
    getChatId
}

export { tool }