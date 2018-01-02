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
            <div>
                <MainCarousel categoryList={this.state.categoryList}/>          
            </div>
        )
    }   
}
export default TopBanner;