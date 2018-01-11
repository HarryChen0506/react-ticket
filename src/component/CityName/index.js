//城市名称组件
import React from 'react'
import './cityName.scss'

class CityName extends React.Component{
    render(){  
         return (
             <div className="city-name" style={this.props.style}
                onClick={()=>{
                    this.props.onClick&&this.props.onClick()
                }}
             >
                 <div className="icon-location-pin location"></div>
                 <div className="city">{this.props.city}</div>
             </div>
        )
    }   
}
export default CityName;