// 演出详情 页面
import React from 'react';
// import { NavBar } from 'antd-mobile';
// import { connect } from 'react-redux';
// import { Route, Switch } from 'react-router-dom';
import ShowCard from './subPages/ShowCard'

import './show.scss'
class Show extends React.Component{ 
    render(){
        // const pathname = this.props.location.pathname;
        console.log('showid',this.props.match.params)
        return(
            <div className="show-page">
                <div className="main">
                  <ShowCard />
                </div>
                <div style={{height: '50px', background: '#ccc'}}></div>
            </div>
        )
    }
}
export default Show;