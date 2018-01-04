// 分类条
import React from 'react'
// import { connect } from 'react-redux'
import './categoryBar.scss'
import Item from './Item';

class CategoryBar extends React.Component{
    constructor(...args){
        super(...args);  
    }    
    render(){      
        const categoryList = this.props.categoryList;  
        const category = this.props.category;
         return (
            <div className="category-bar border" style={this.props.style}>
              <div className="category-container">
                  {categoryList.map((item)=>(
                    <Item
                        key={item.text}
                        title={item.text}
                        selected={category.name===item.name}
                        onPress={()=>{
                            this.props.onPress&&this.props.onPress(item);
                        }}
                    /> 
                  ))}
                                          
              </div>
            </div>
        )
    }   
}
export default CategoryBar;