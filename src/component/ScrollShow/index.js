// 滚动演出的演出小组件
import React from 'react'
import './scrollShow.scss'
class ScrollShow extends React.Component{
    render(){   
        const show = this.props.show||{};     
         return (
            <div className="scroll-show-component" 
                 style={this.props.style}
                 onClick={()=>this.props.onClick&&this.props.onClick(show)}
            > 
                <div className="short-content"> 
                    <div className="image-container"> 
                        <img src={show.imgUrl} alt={show.showName}/> 
                        <div className="discount"
                            style={{ backgroundImage: `url(${require('./images/discount-bg.png')})`}}
                        ><span className="number">{show.number}</span>{show.text}</div>
                    </div> 
                    <div className="show-name">{show.showName}</div> 
                    <div className="show-time">{show.showTime}</div>                               
                </div>
            </div>
        )
    }   
}
export default ScrollShow;