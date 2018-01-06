// 主页轮播图
import React from 'react';
// import { Link } from 'react-router-dom';
import ReactSwipe from 'react-swipe';
import './mainCarousel.scss';

class MainCarousel extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            index: 0
        };       
    }
    componentDidMount(){
        // console.log('Category组件挂载');
        // console.log(this.reactSwipe)        
    }
    handleSlide(index, duration){
    //    console.log('reactSwipe', this.reactSwipe );
       this.reactSwipe.swipe.slide(index,duration)
    }  
    render(){
        let options = {
            startSlide: 0,
            speed: 400,
            auto: 4000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: (index, elem)=> {
                this.setState({
                    index: index
                })
            },
            transitionEnd: function(index, elem) {}
        }
        const categoryList = this.props.categoryList;
        return (
            <div className="carousel">
                <ReactSwipe ref={(reactSwipe)=>{ this.reactSwipe = reactSwipe}} className="carousel-box" swipeOptions={options} >
                    { categoryList.length >0 && categoryList.map((item, index)=>{
                        return  <div className="carousel-container clear-fix" key={'box_'+index}  style={{backgroundImage: 'url('+item.img_url+')'}}></div>
                    }) }
                </ReactSwipe> 
                <div className="dot-box">
                    {
                        categoryList.length >0 && categoryList.map((item, index)=>{
                            return <div className={this.state.index === index ? 'selected dot' : 'dot'} 
                                        onClick={this.handleSlide.bind(this,index,1000)}
                                        key = {index}
                                    ></div>
                        })
                    }
                </div>
            </div> 
        )
    }   
}
export default MainCarousel;