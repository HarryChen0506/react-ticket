// 热门城市按钮
import React from 'react'
import './cityButton.scss'

class CityButton extends React.Component{
    render(){ 
         return (
            <div className={"city-button "+(this.props.active?'active':'')} onClick={()=>{this.props.onClick&&this.props.onClick()}}>               
              {this.props.name}
            </div>
        )
    }   
}
export default CityButton;