// 我的订单组件
import React from 'react'
import {  List } from 'antd-mobile'

import './myOrder.scss'
class MyOrder extends React.Component{
    constructor(...args){
        super(...args);
    }    
    render(){  
        const Item = List.Item;
        const Brief = Item.Brief; 
         return (
             <div
                style={this.props.style}
             >  
                <List className="my-order-list" >                        
                    <Item
                        arrow="horizontal"
                        extra={this.props.extra}
                        multipleLine
                        platform="android"
                        onClick={() => {
                            typeof this.props.onClick==='function'&&this.props.onClick()
                        }}
                    >
                       <div className="order-content">{this.props.content}</div> 
                    </Item>
                    <div style={{padding: '0px 15px',}}>   
                        {this.props.children}
                    </div>
                </List>
            </div>
        )
    }   
}
export default MyOrder;