// 提示框小组件
import React from 'react'
import './scrollTop.scss'

class ScrollTop extends React.Component{
    calClassName(){
        if(this.props.fadeIn){
            return 'fade-in'
        }else{
            return 'fade-out'
        }        
    }
    render(){   
         return (
            <div 
                className={"scroll-top "+this.calClassName()} 
                style={this.props.style}
                onClick={()=>{
                    if(this.props.fadeIn){
                        this.props.onClick&&this.props.onClick()
                    }                    
                }}
            >
                <div style={{
                    background: `url(${require('./images/back-top.png')}) 0 0 no-repeat`,
                    backgroundSize: '36px 36px',width: '36px',height:'36px'
                }}>
                </div>
            </div>
        )
    }   
}
export default ScrollTop;