// 提示框小组件
import React from 'react'
import './noticeTip.scss'
class NoticeTip extends React.Component{
    render(){        
         return (
            <div className="notice-tip" style={this.props.style}>
              {this.props.content}
            </div>
        )
    }   
}
export default NoticeTip;