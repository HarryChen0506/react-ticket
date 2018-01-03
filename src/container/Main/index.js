// 主页精选页面
import React from 'react'
import { connect } from 'react-redux'
import config from 'config'

import TopBanner from './subPages/TopBanner'
import Category from './subPages/Category'
import HotShow from './subPages/HotShow'

class Main extends React.Component{
    constructor(...args){
        super(...args);        
        this.state = {
            categoryList: config.categoryList
        }
    }

    render(){        
         return (
            <div>
                <TopBanner /> 
                <div style={{height: '25px', width: '100%', background: '#fff'}}></div>  
                <Category categoryList = {this.state.categoryList}/>   
                <div style={{padding: '0 4%',background: '#fff'}}>                    
                    <HotShow />
                </div>                         
               
            </div>
        )
    }   
}
export default Main;