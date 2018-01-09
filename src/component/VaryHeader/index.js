//变化的头部组件
// 模块的标题
import React from 'react'
import './varyHeader.scss'

class VaryHeader extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            opacity: 0,
            className: 'light',
            scrollTop: this.props.scrollTop||0
        }
        this.config = {
             threshold: this.props.threshold||100,
        }
    }
    componentWillReceiveProps(nextProps){
    //    console.log('nextProps',nextProps)
    //    const boxHeight= this.box.getBoundingClientRect().height;
    //    console.log('boxHeight',boxHeight)        
        console.log('opacity',this.calOpacity(),this.calClassName())
        this.setState({
            opacity: this.calOpacity(),
            className: this.calClassName()
        })
    }
    calOpacity(){
        const scrollTop = this.props.scrollTop;
        const radio = scrollTop/this.config.threshold;
        if(radio>1){
            return  1
        }else if(radio<0.15){
            return 0
        }
        return radio        
    }
    calClassName(){
        const scrollTop = this.props.scrollTop;
        const threshold = this.props.threshold*0.8;
        if(scrollTop>threshold){
            return 'deep'
        }else{
            return 'light'
        }
    }
    render(){   

         return (
             <div style={this.props.style}>
                  <div className={"vary-header "+this.state.className} ref={(_el)=>{this.box=_el}}> 
                        <div className="middle" style={{opacity: this.state.opacity}}>{this.props.middle}</div>    
                        <div className="left">{this.props.left}</div> 
                        <div className="right">{this.props.right}</div>
                  </div>
             </div>
          
        )
    }   
}
VaryHeader.defaultProps = {
    arrow: false
}
export default VaryHeader;