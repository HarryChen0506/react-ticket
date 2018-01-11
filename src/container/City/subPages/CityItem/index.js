// 城市分类组件
import React from 'react'
import { Icon } from 'antd-mobile'
import './cityItem.scss'

class CityItem extends React.Component{
    render(){ 
         return (
            <div className="city-item" onClick={()=>{this.props.onClick&&this.props.onClick()}}>               
               <div className="item-left">
                   {this.props.name}
               </div>
               {this.props.active?<div className="item-right"><Icon type={'check'}  size={'xxs'}  /></div>:null}
            </div>
        )
    }   
}
export default CityItem;