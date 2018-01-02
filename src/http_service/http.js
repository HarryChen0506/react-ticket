//封装axios 接口服务

import axios from 'axios';
//全局配置
// `withCredentials` 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;

function obj2Form(data){
    var formData = new FormData();
     for(var key in data){
         formData.append(key, data[key]);
     }
     return formData
}

//get 请求
function httpGet(url){
    let promise = new Promise(function(resolve, reject){
        axios({
            method: 'get',
            url: url
        }).then(function(response){
            resolve(response)
        }).catch(function(err){
            reject(err)
        })
    })
    return promise   
}
//post请求 json
function httpPost(url,data){
    let promise = new Promise(function(resolve, reject){
        axios({
            method: 'post',
            url: url,
            data:data
        }).then(function(response){
            resolve(response)
        }).catch(function(err){
            reject(err)
        })
    })
    return promise   
}
//post请求 form
function httpPostForm(url, data){
    let promise = new Promise(function(resolve, reject){
        axios({
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: obj2Form(data)
        }).then(function(response){
            resolve(response)
        }).catch(function(err){
            reject(err)
        })
    })
    return promise   
}
let http = {
    httpGet,
    httpPost,
    httpPostForm
}

export default http