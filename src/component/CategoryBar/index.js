// 分类条
import React from 'react'
// import { connect } from 'react-redux'
import './categoryBar.scss'
import Item from './Item';

class CategoryBar extends React.Component{
    calScrollValue(node){
        // console.log('node',node.getBoundingClientRect())
        const params = node.getBoundingClientRect();
        const distanceToLeft = params.left||0; //小盒子距离左边的距离
        const width = params.width||0;
        return distanceToLeft+0.5*width;        
    } 
    handleScroll({left,top}){
        const wrapper = this.wrapper;
        const width_wrapper = wrapper.getBoundingClientRect().width;  //容器的宽度
        const scrollLeft = wrapper.scrollLeft;  // 容器的距离左边的滚动距离
        const move_distance = (scrollLeft+left)-0.5*width_wrapper; //
        // console.log('盒子距离左边的距离',left);
        // console.log('width_wrapper',width_wrapper)
        // console.log('scrollLeft',scrollLeft)        
        // console.log('move_distance',move_distance)   
        this.moveScroll({
            node: wrapper,
            lastDistance: scrollLeft,
            endDistance: move_distance,
            top: top,
            time: 10
        })      
    }
    moveScroll({node, lastDistance, endDistance, top, time}){
        const step = (endDistance-lastDistance)*0.02;  //步进器
        let curDistance = lastDistance;  //当前位置 标志位
        if(this.timeId){
            // console.log('this.timeId',this.timeId)
            clearInterval(this.timeId)
        }      
         this.timeId = setInterval(()=>{
                // console.log('lastDistance',lastDistance);
                // console.log('endDistance',endDistance);
                // console.log('step',step);
                // console.log('curDistance',curDistance)
             if(step>0){
                if(curDistance<=endDistance){
                    curDistance += step;                   
                    // node.scrollTo(curDistance,top)
                    this.scrollTo(node, curDistance, top)
                }else{
                    clearInterval(this.timeId)
                }
             }else {
                 if(curDistance>=endDistance){
                     curDistance += step;
                    //  node.scrollTo(curDistance,top)
                    this.scrollTo(node, curDistance, top)
                 }else{
                     clearInterval(this.timeId)
                 }                 
             }                       
         },time)
        //  node.scrollTo(endDistance,top) ;
    }
    scrollTo(node,curDistance,top ){
        if(node&&typeof(node.scrollTo)==='function'){
           node.scrollTo(curDistance,top) 
        }
    }
    render(){      
        const categoryList = this.props.categoryList;  
        const category = this.props.category;
         return (
            <div className="category-bar border" style={this.props.style} ref={(_el)=>{this.wrapper = _el}}>
              <div className="category-container" >
                  {categoryList.map((item)=>(
                    <Item                        
                        key={item.text}
                        title={item.text}
                        selected={category.name===item.name}
                        onPress={()=>{
                            this.props.onPress&&this.props.onPress(item);                            
                        }}
                        onScroll={(_el)=>{ 
                            this.handleScroll({
                                left: this.calScrollValue(_el),
                                top:0
                            });
                        }}
                    /> 
                  ))}
                                          
              </div>
            </div>
        )
    }   
}
export default CategoryBar;