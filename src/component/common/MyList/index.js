// 基于antd-mobile改造后的List
import React from 'react'
import { List } from 'antd-mobile'

import './myList.scss'
class MyList extends React.Component{
    render(){ 
         return (
            <div style={this.props.style}>
                <List className="my-list"
                    {...this.props}
                >                        
                   {this.props.children}                    
                </List>
            </div>            
        )
    }   
}

const MyItem = List.Item;

export {MyList, MyItem}





