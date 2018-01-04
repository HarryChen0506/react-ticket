// 主页精选页面
import React from 'react'
import config from 'config'
import TopBanner from './subPages/TopBanner'
import Category from './subPages/Category'
import HotShow from './subPages/HotShow'
import RecommendShow from './subPages/RecommendShow'

import { connect } from 'react-redux'
import { categoryShow } from 'redux_module/redux/show.redux.js';

@connect(
    state=>state,
    { categoryShow }
)
class Main extends React.Component{
    constructor(...args){
        super(...args);        
        this.state = {
            categoryList: config.mainCategoryList
        }
    }
    render(){        
         return (
            <div>
                <TopBanner /> 
                <div style={{height: '25px', width: '100%', background: '#fff'}}></div>  
                <Category 
                    categoryList = {this.state.categoryList}
                    onPress={(_el)=>{this.props.categoryShow(_el);console.log(this.props.history.push('/list'))}}
                />   
                <div style={{padding: '0 4%',background: '#fff'}}>                    
                    <HotShow />
                    <RecommendShow />
                </div>                         
               
            </div>
        )
    }   
}
export default Main;