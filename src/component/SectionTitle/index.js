// 模块的标题
import React from 'react'
import './sectionTitle.scss'

class SectionTitle extends React.Component{
    render(){        
         return (
           <div className="section-title">                 
                <div className="title-container">
                    <span> {this.props.title} </span>
                    {this.props.arrow?
                        <i className="icon-arrow-right" style={{backgroundImage: `url(${require('./images/icon-arrow-right.png')})`}}></i>
                    :null}                    
                 </div>                    
           </div>
        )
    }   
}
SectionTitle.defaultProps = {
    arrow: false
}
export default SectionTitle;