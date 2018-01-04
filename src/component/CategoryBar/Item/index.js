// 分类条
import React from 'react'
// import { connect } from 'react-redux'
import './item.scss'

class Item extends React.Component{
    
    render(){ 
         const options = this.props; 
         return (            
            <div 
                className={'item '+ (options.selected?'active':'')}
                onClick={()=>options.onPress&&options.onPress()}
            > 
                <div>{options.title}</div>
            </div>                
        )
    }   
}
export default Item;