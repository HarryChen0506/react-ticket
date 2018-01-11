// 城市分类组件
import React from 'react'
import './cityCategory.scss'

class CityCategory extends React.Component{
    render(){ 

         return (
            <div className="city-category">
               <div className="category-title">{this.props.title}</div>
               <div className={"category-body "+ this.props.type }>
                   {this.props.children}
               </div>
            </div>
        )
    }   
}
export default CityCategory;