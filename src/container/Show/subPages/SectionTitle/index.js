//  区块标题
import React from 'react';
import './sectionTitle.scss'
class SectionTitle extends React.Component{ 
    render(){       
        return(
            <div className="section-title-component" style={this.props.style}>
                {this.props.content}
            </div>
        )
    }
}
export default SectionTitle;
