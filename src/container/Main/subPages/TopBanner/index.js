// 精选页面-头部banner
import React from 'react'
import { connect } from 'react-redux'
import './topBanner.scss'
import MainCarousel from 'component/MainCarousel'
class TopBanner extends React.Component{
    render(){
         return (
            <div>
                <MainCarousel categoryList={[{code:'5a4610c5e4b05e3f4437e374', img_url:'https://img0.tking.cn/assets/img/4BpNaXcWWA.jpg'},
                    {code:'5a4610c5e4b05e3f4437e374',img_url:'https://img1.tking.cn/assets/img/emDNCT2phy.jpg'},
                    {code:'123',img_url:'https://img0.tking.cn/assets/img/7eMRedRKKX.jpg'}]}/>
            </div>
        )
    }   
}
export default TopBanner;