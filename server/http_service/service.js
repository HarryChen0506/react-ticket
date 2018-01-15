//整理api
var http = require('./http.js');

function formatParams(data) {
    var arr = [];
    for (var key in data) {
         if(!!data[key] || data[key]===0||data[key]===false){
            if(Array.isArray(data[key])){
                for(var i=0; i<data[key].length; i++){
                    arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key][i]))
                }
            }else{
               arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            }
        }       
    }
    arr.push("time=" + new Date().getTime());
    return arr.join("&");
}
function getUrl(url, params){   
    var prefix = "";
    if(url.indexOf("?")>0){
        prefix = "&";
    }else{
        prefix = "?";
    }
    url = url+ prefix + formatParams(params);
    return url;
} 
var show = {
    getCarouselBanner: function(params){
        const siteCityOID = params.siteCityOID||'1001'
        // https://m.tking.cn/prodapi/pub/site/1001/banner/app?bannerCategory=&time=1514877675300&siteCityOID=1001
        const api = 'https://m.tking.cn/prodapi/pub/site/'+siteCityOID+'/banner/app'
        const url = getUrl(api,params)
        return http.httpGet(url)
    },
    getMarketingShows: function(params){
        const siteCityOID = params.siteCityOID||'1001'
        // https://m.tking.cn/prodapi/pub/site/1001/topMarketingShows?src=weixin&time=1514961606452&siteCityOID=1001
        const api = 'https://m.tking.cn/prodapi/pub/site/'+siteCityOID+'/topMarketingShows'
        const url = getUrl(api,params)
        return http.httpGet(url)
    },
    getRecommendShows: function(params){
        const siteCityOID = params.siteCityOID||'1001'
        // https://m.tking.cn/showapi/pub/site/1001/hot_show?&offset=0&length=10&src=weixin&time=1514975389512&siteCityOID=1001
        const api = 'https://m.tking.cn/showapi/pub/site/'+siteCityOID+'/hot_show'
        const url = getUrl(api,params)
        return http.httpGet(url)
    },
    getListShows: function(params){
        const siteCityOID = params.siteCityOID||'1001'
        //https://m.tking.cn/showapi/pub/site/3101/active_show?offset=0&length=10&type=1&src=m_web&sorting=weight&seq=desc&client=piaodashi_weixin&time=1515133417052&locationCityOID=&siteCityOID=3101
        const api = 'https://m.tking.cn/showapi/pub/site/'+siteCityOID+'/active_show'
        const url = getUrl(api,params)
        return http.httpGet(url)
    },
    getShowById: function(showOID,params){
        //https://m.tking.cn/showapi/pub/show/5a128275a251d83d1f0e191d?client=piaodashi_weixin&src=m_web&time=1515476939151
        const api = 'https://m.tking.cn/showapi/pub/show/'+showOID
        const url = getUrl(api,params)
        return http.httpGet(url)
    },
    getRelateShowList(showOID,params){
        //https://m.tking.cn/showapi/pub/shows/5a2657266204e6181d467da9/recommendShows?src=m_web&offset=0&length=5&time=1515494380049
        const api = 'https://m.tking.cn/showapi/pub/shows/'+showOID+'/recommendShows'
        const url = getUrl(api,params)
        return http.httpGet(url)
    },
    getCities(params){
        //https://m.tking.cn/showapi/cities
        const api = 'https://m.tking.cn/showapi/cities'
        const url = getUrl(api,params)
        return http.httpGet(url)
    }
}
var service = {
    show: show
}
module.exports = service;