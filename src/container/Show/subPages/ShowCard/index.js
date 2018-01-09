// 演出详情 演出卡片组件
import React from 'react';
// import { NavBar } from 'antd-mobile';
// import { connect } from 'react-redux';
// import { Route, Switch } from 'react-router-dom';

import './showCard.scss'
class ShowCard extends React.Component{ 
    render(){       
        const show = this.props.show;
        return(
            <div className="show-card">
               <div className="card-img"
                    style={{backgroundImage: `url(${show.imgUrl})`}}
               ></div>
               <div className="card-detail"> 
                   <div className="row"> 
                       <div className="name">{show.showName}</div> 
                    </div>
                    <div className="row"> 
                        <div className="tags"><div className="tag">{show&&show.showStatus&&show.showStatus.displayName}</div></div> 
                        <div className="price" ><div className="number">{show.minPrice}</div><div className="text">元起</div></div> 
                    </div> 
                </div>
                <div className="card-discount"> 
                    <div className="number ng-binding"> {show.discount} </div> {show.text} 
                </div>
                <div className="card-bg">
                    <div className="img-holder" 
                        style={{backgroundImage: `url(${show.imgUrl})`}}></div>
                    <div className="img-border"
                         style={{backgroundImage: `url(${require('./images/border.png')})`}} 
                    ></div>
                </div>
            </div>
        )
    }
}
export default ShowCard;
