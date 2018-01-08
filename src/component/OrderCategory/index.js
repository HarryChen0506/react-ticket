// 订单分类列表
import React from 'react'
import { Grid } from 'antd-mobile';
import './orderCategory.scss'

class OrderCategory extends React.Component{
    render(){      
         const data = this.props.categoryList;
         return (
            <div className="order-category" style={this.props.style}>
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

export default OrderCategory;