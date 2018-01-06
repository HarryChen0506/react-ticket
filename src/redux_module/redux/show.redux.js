import httpService from 'http_service/service.js';
//定义变量
const SHOW_BANNER = 'SHOW_BANNER';  //banner演出
const SHOW_HOT = 'SHOW_HOT';  //热门演出
const SHOW_RECOMMEND = 'SHOW_RECOMMEND';  //推荐演出
const ERROR_MSG = 'ERROR_MSG';
const SHOW_CATEGORY = 'SHOW_CATEGORY'; //演出分类
const SHOW_LIST = 'SHOW_LIST'; //演出列表

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
function bannerShow(data){   
    return {
        type: SHOW_BANNER,
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
function hotShow(data){   
    return {
        type: SHOW_HOT,
        payload: data
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
function recommendShow(data){   
    return {
        type: SHOW_RECOMMEND,
        payload: data
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
function listShow(data, config){   
    return {
        type: SHOW_LIST,
        payload: data,
        config: config
    } 
}
function calHasMore({count,offset,length}){
        //计算是否还有更多   
    return (count-length-offset)>0
}  
export function loadListShow(params,config,callback){
    return (dispatch)=>{
        params.offset = params.offset||0;
        params.length = params.length||10;
        params.siteCityOID = params.siteCityOID||'1001';
        params.src = params.src||'m_web';
        params.sorting = params.sorting||'weight';
        params.seq = params.seq||'desc';
        params.client = params.client||'piaodashi_weixin';
        //是否正在加载更多
        dispatch(listShow({isLoadingMore: true}))
        callback&&typeof callback.beforeSend==='function'&&callback.beforeSend();
        httpService.main.getListShows(params).then((res)=>{
            dispatch(listShow({isLoadingMore: false})) 
            if(res.data.statusCode===200){       
                const result = res.data.result      
                const pagination = result.pagination ||{}      
                const shows = result.data||[];
                const offset = pagination.offset||0;
                const count = pagination.count||0;
                const length = pagination.length||0;   
                const hasMore = calHasMore({count,offset,length});
                const scrollToTop = config&&config.scrollToTop || false;                         
               dispatch(listShow({shows, offset, count, length, hasMore, scrollToTop},config))
               callback&&typeof callback.success==='function'&&callback.success(res);              
            }else{                
                callback&&typeof callback.fail==='function'&&callback.fail(res);
            }               
        },(err)=>{
            callback&&typeof callback.error==='function'&&callback.error(err);
            dispatch(listShow({isLoadingMore: false}))   
        })
    }
}


const initState = {
    bannerShow: [],
    hotShow: [],
    recommendShow: [],
    listShow: {
        shows:[],
        count:0,
        length:0,
        offset:0,
        page:0,
        hasMore: false,
        isLoadingMore: false, //是否正在加载更多
        scrollToTop: false
    },
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
        case SHOW_LIST:
            if(action.config&&action.config.concat){
               const shows = state.listShow.shows.concat(action.payload.shows);
               //const listShow ={...state.listShow, ...action.payload, shows}
               return {...state, listShow: {...state.listShow, ...action.payload, shows}} 
            }
            return {...state, listShow: {...state.listShow, ...action.payload}} 
        case ERROR_MSG:
            return {...state, ...action.payload}
        default:
            return state
    }
}