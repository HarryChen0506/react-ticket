// 演出详情 演出卡片组件
import React from 'react';
// import { NavBar } from 'antd-mobile';
// import { connect } from 'react-redux';
// import { Route, Switch } from 'react-router-dom';

import './showCard.scss'
class ShowCard extends React.Component{ 
    render(){       
        return(
            <div className="show-card">
               <div className="card-img"
                    style={{backgroundImage: 'url(https://img2.tking.cn/assets/img/b2WfWZftJw.jpg)'}}
               ></div>
               <div className="card-detail"> 
                   <div className="row"> 
                       <div className="name">【上海站】中国有嘻哈live巡回演唱会</div> 
                    </div>
                    <div className="row"> 
                        <div className="tags"><div className="tag">售票中</div></div> 
                        <div className="price" ><div className="number">548</div><div className="text">元起</div></div> 
                    </div> 
                </div>
                <div className="card-discount"> 
                    <div className="number ng-binding"> 9.9 </div> 折起 
                </div>
                <div className="card-bg">
                    <div className="img-holder" 
                        style={{backgroundImage: 'url(https://img2.tking.cn/assets/img/b2WfWZftJw.jpg)'}}></div>
                    <div className="img-border"
                         style={{backgroundImage: `url(${require('./images/border.png')})`}} 
                    ></div>
                </div>
            </div>
        )
    }
}
export default ShowCard;
