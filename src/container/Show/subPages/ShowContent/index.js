// 演出详情 演出信息组件
import React from 'react';
import './showContent.scss'
class ShowContent extends React.Component{ 
    render(){       
        return(
            <div className="show-content" style={this.props.style}>
               {this.props.children}
               <div className="show-main">
                    <div dangerouslySetInnerHTML={{__html: this.props.htmlStr}}>
                    </div>
               </div>
                             
            </div>
        )
    }
}
export default ShowContent;
