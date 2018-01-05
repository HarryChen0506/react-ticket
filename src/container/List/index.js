// 主页精选页面
import React from 'react'
import CategoryBar from 'component/CategoryBar'
import ListShow from './subPages/ListShow'
import config from 'config'

import { connect } from 'react-redux'
import { categoryShow } from 'redux_module/redux/show.redux.js';
import './list.scss'

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
        console.log('category-all',category)   
         return (
            <div className="list-page">               
                <CategoryBar  
                    categoryList = {this.state.categoryList} 
                    style={{height: '5rem'}}
                    category={category}
                    onPress={(_el)=>{
                        const data =Object.assign({}, _el)
                        this.props.categoryShow(data);                                            
                    }}
                />                
                <ListShow 
                    category={category}
                />
                <div>{
                    category.code
                }
                </div>
                
            </div>
        )
    }   
}
export default List;