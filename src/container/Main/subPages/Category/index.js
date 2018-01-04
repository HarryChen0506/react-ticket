// 主页-分类列表
import React from 'react'
import { Grid } from 'antd-mobile';
import './category.scss'

class Category extends React.Component{
    render(){      
         const data = this.props.categoryList;
         return (
            <div className="category">
               <Grid 
                    data={data} 
                    hasLine={false}
                    columnNum = {data.length}
                    activeStyle={false}
                    onClick={ _el=>this.props.onPress&&this.props.onPress(_el)}
               />
            </div>
        )
    }   
}
export default Category;