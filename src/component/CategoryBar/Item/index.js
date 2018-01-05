// 分类条
import React from 'react'
// import { connect } from 'react-redux'
import './item.scss'

class Item extends React.Component{
    
    render(){ 
         const options = this.props; 
         return (            
            <div 
                ref={(_el) => { this.box = _el}}
                className={'item '+ (options.selected?'active':'')}
                onClick={()=>{
                    options.onPress&&options.onPress(); 
                    options.onScroll&&options.onScroll(this.box)
                }}
            > 
                <div>{options.title}</div>
            </div>                
        )
    }   
}
export default Item;