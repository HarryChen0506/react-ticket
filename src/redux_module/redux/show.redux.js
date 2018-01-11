import httpService from 'http_service/service.js';
//定义变量
const SHOW_BANNER = 'SHOW_BANNER';  //banner演出
const SHOW_HOT = 'SHOW_HOT';  //热门演出
const SHOW_RECOMMEND = 'SHOW_RECOMMEND';  //推荐演出
const ERROR_MSG = 'ERROR_MSG';
const SHOW_CATEGORY = 'SHOW_CATEGORY'; //演出分类
const SHOW_LIST = 'SHOW_LIST'; //演出列表
const SHOW_DEMO = 'SHOW_DEMO'; //测试
const SHOW_CITY = 'SHOW_CITY'; //城市站点

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
export function demoShow(data){
    return {
        type: SHOW_DEMO,
        payload: data
    }
}
export function cityShow(data){
    return {
        type: SHOW_CITY,
        payload: data
    }
}
function bannerShow(data){   
    return {
        type: SHOW_BANNER,
        payload: data
    } 
}
export function loadBannerShow(params){
    return (dispatch)=>{        
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
export function loadHotShow(params){
    return (dispatch)=>{
        const { offset=0, length=10, siteCityOID='1001', src='weixin'} = params;
        httpService.main.getMarketingShows({offset, length, siteCityOID, src }).then((res)=>{
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
export function loadRecommendShow(params){
    return (dispatch)=>{
        const { offset=0, length=10, siteCityOID='1001', src='weixin'} = params;       
        httpService.main.getRecommendShows({offset, length, siteCityOID, src }).then((res)=>{
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
        const { offset=0, length=10, siteCityOID='1001', src='m_web',sorting='weight', seq='desc', client='piaodashi_weixin', type } = params;
        callback&&typeof callback.beforeSend==='function'&&callback.beforeSend();
        httpService.main.getListShows({offset, length, siteCityOID, src, sorting, seq, client, type}).then((res)=>{
            if(res.data.statusCode===200){       
                const result = res.data.result    
                const shows = result.data||[]; 
                const { offset=0, count=0, length=0} = result.pagination||{};
                const hasMore = calHasMore({count,offset,length});
                const scrollToTop = (config&&config.scrollToTop) || false;                         
               dispatch(listShow({shows, offset, count, length, hasMore, scrollToTop}, config))
               callback&&typeof callback.success==='function'&&callback.success(res);              
            }else{                
                callback&&typeof callback.fail==='function'&&callback.fail(res);
            }               
        },(err)=>{
            callback&&typeof callback.error==='function'&&callback.error(err);
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
        scrollToTop: false
    },
    category: {},
    demo: '',
    city: {        
        cityOID: "3101",
        province: "上海市",
        cityName: "上海",
        spelling: "shanghai",
    },
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
        case SHOW_CITY:
            return {...state, city: action.payload}
        case ERROR_MSG:
            return {...state, ...action.payload}
        case SHOW_DEMO:
            return {...state, ...action.payload}
        
        default:
            return state
    }
}