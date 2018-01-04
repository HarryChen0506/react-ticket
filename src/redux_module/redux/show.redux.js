import httpService from 'http_service/service.js';
//定义变量
const SHOW_BANNER = 'SHOW_BANNER';  //banner演出
const SHOW_HOT = 'SHOW_HOT';  //热门演出
const SHOW_RECOMMEND = 'SHOW_RECOMMEND';  //推荐演出
const ERROR_MSG = 'ERROR_MSG';
const SHOW_CATEGORY = 'SHOW_CATEGORY'; //演出分类

function bannerShow(data){   
    return {
        type: SHOW_BANNER,
        payload: data
    } 
}
function hotShow(data){   
    return {
        type: SHOW_HOT,
        payload: data
    } 
}
function recommendShow(data){   
    return {
        type: SHOW_RECOMMEND,
        payload: data
    } 
}
export function categoryShow(data){
    return {
        type: SHOW_CATEGORY,
        payload: data
    } 
}
export function errorMsg(data){
    return {
        type: ERROR_MSG,
        payload: data
    }
}
export function loadBannerShow(){
    return (dispatch)=>{
        const params = {
           siteCityOID: '1001'
        } 
        httpService.main.getCarouselBanner(params).then((res)=>{
            if(res.data.statusCode===200){
                const list = res.data.result.data;
                dispatch(bannerShow(list))               
            }
        },(err)=>{
            dispatch(errorMsg({msg:err}))
        }) 
    }
}
export function loadHotShow(){
    return (dispatch)=>{
        const params = {
            src: 'weixin',
            siteCityOID: '1001'
        } 
        httpService.main.getMarketingShows(params).then((res)=>{
            if(res.data.statusCode===200){
                const data = res.data.result.data;
                const recentShows = data.recentShows;
                dispatch(hotShow(recentShows))               
            }
        },(err)=>{
            dispatch(errorMsg({msg:err}))
        }) 
    }
}
export function loadRecommendShow(){
    return (dispatch)=>{
        const params = {
            src: 'weixin',
            siteCityOID: '1001',
            offset: 0,
            length: 10
        } 
        httpService.main.getRecommendShows(params).then((res)=>{
            if(res.data.statusCode===200){
                const recommendShows = res.data.result.data;
                dispatch(recommendShow(recommendShows))               
            }
        },(err)=>{
            dispatch(errorMsg({msg:err}))
        }) 
    }
}


const initState = {
    bannerShow: [],
    hotShow: [],
    recommendShow: [],
    category: {},
    msg: ''
}
export function show(state = initState, action){
    switch(action.type){
        case SHOW_BANNER:
            return {...state, bannerShow: action.payload}
        case SHOW_HOT:
            return {...state, hotShow: action.payload} 
        case SHOW_RECOMMEND:
            return {...state, recommendShow: action.payload} 
        case SHOW_CATEGORY:
            return {...state, category: action.payload} 
        case ERROR_MSG:
            return {...state, ...action.payload}
        default:
            return state
    }
}