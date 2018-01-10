// 演出详情 演出信息组件
import React from 'react';
import { Icon } from 'antd-mobile'
import './showContent.scss'
class ShowContent extends React.Component{ 
    constructor(...args){
        super(...args);
        this.state = {
            showAll: false,
            hideHeight: '200px',
            allHeight: '1000px',
            height: '200px'
        }
        this.timer = null;
    }
    componentDidMount(){
       this.calBoxHeight();              
    }
    componentWillUnmount(){
        // console.log('销毁',this.timer)
        clearTimeout(this.timer)
    }
    calBoxHeight(){
        //计算容器高度
       if(this.timer){
           clearTimeout(this.timer)
       }
       this.timer = setTimeout(()=>{
            this.setState({
                allHeight: this.htmlBox.getBoundingClientRect().height+'px'
            }) 
        },1000)
    }
    render(){       
        return(
            <div className="show-content" style={this.props.style}>
               {this.props.children}
               <div 
                    className={"show-main"}
                    style={{height: this.state.height}}
               >
                    <div ref={(_el)=>{this.htmlBox = _el}} dangerouslySetInnerHTML={{__html: this.props.htmlStr}}>
                    </div>
               </div>
               <div className="show-all">
                   <div className="all" onClick={()=>{                        
                        this.setState({
                            showAll: !this.state.showAll                            
                        })
                        this.setState({
                            height: !this.state.showAll?this.state.allHeight:this.state.hideHeight                            
                        })
                    }}>
                        <span className="text">{!this.state.showAll?'查看详情':'收起详情'} </span>
                        <Icon type={!this.state.showAll?'down':'up'} size={'xxs'}/>
                   </div>                  
               </div>
                             
            </div>
        )
    }
}
export default ShowContent;
