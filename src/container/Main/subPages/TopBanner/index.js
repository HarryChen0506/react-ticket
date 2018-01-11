// 精选页面-头部banner
import React from 'react'
import { connect } from 'react-redux'
import './topBanner.scss'
import MainCarousel from 'component/MainCarousel'

@connect(
    state=>state,
    null
)
class TopBanner extends React.Component{    
    getCarouselBanner(list=[]){
        const showList = list.map((item)=>({
            code: item.bannerOID,
            img_url: item.posterUrl
        }))
        if(showList.length>0){
            return showList
        }else {
            return [{},{},{},{},{},{},{},{},{},{}]
        }            
    }
    render(){        
         const categoryList = this.getCarouselBanner(this.props.show.bannerShow);
        //  console.log('categoryList',categoryList)
         return (
            <div className="top-banner">
                <MainCarousel categoryList={categoryList}/>
                <div className="bottom-cover left"></div>       
                <div className="bottom-cover right"></div>     
                <div className="search-input"> 
                    <div className="search-icon" style={{backgroundImage: `url(${require('./images/search-icon.png')})`}}></div> 
                    <div className="search-placeholder ng-binding">共有3434场折扣演出在售</div>
                </div>  
            </div>
        )
    }   
}
export default TopBanner;