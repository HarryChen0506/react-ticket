// 主页精选页面
import React from 'react'
import { connect } from 'react-redux'
import CategoryBar from 'component/CategoryBar'
import config from 'config'

import { categoryShow } from 'redux_module/redux/show.redux.js';

@connect(
    state=>state,
    { categoryShow }
)
class List extends React.Component{
    constructor(...args){
        super(...args);  
        this.state = {
            categoryList: config.categoryList
        }
    }
    render(){   
        const category=this.props.show.category;      
         return (
            <div>               
                <CategoryBar  
                    categoryList = {this.state.categoryList} 
                    style={{height: '5rem'}}
                    category={category}
                    onPress={(_el)=>{this.props.categoryShow(_el);console.log(_el)}}
                />
            </div>
        )
    }   
}
export default List;