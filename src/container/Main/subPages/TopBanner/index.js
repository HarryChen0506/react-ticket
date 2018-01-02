// 精选页面-头部banner
import React from 'react'
import { connect } from 'react-redux'
import './topBanner.scss'
import MainCarousel from 'component/MainCarousel'
import httpService from 'http_service/service.js'
class TopBanner extends React.Component{
    constructor(...args){
        super(...args)
        this.state = {
            categoryList: [{},{},{},{},{},{},{},{},{},{}]
            // categoryList: []
        }
    }
    componentDidMount(){
        this.getCarouselBanner();
    }
    getCarouselBanner(){
        const params = {
           siteCityOID: '1001'
        } 
        httpService.main.getCarouselBanner(params).then((res)=>{
            const list = res.data.result.data;
            const categoryList = list.map((item)=>({
                code: item.bannerOID,
                img_url: item.posterUrl
            }))
            this.setState({
                categoryList
            })
        },(err)=>{
            alert(err)
        })
    }
    render(){
         return (
            <div className="top-banner">
                <MainCarousel categoryList={this.state.categoryList}/> 
                <div className="bottom-cover left"></div>       
                <div className="bottom-cover right"></div>     
                <div className="search-input"> 
                    <div className="search-icon" style={{backgroundImage: `url(${require('static/images/search-icon.png')})`}}></div> 
                    <div className="search-placeholder ng-binding">共有3434场折扣演出在售</div>
                </div>  
            </div>
        )
    }   
}
export default TopBanner;