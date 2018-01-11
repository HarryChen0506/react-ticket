// 底部的公司名称
import React from 'react'
import './sectionLogo.scss'
class SectionLogo extends React.Component{
    render(){        
         return (
           <div className="section-logo" {...this.props}>
               <div className="title-wraper">
                    <span className="icon left" ></span>                
                    <span className="icon right"></span>   
                    <span className="title">{this.props.title}</span> 
               </div>                           
            </div>
        )
    }   
}
export default SectionLogo;