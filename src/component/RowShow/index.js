// 演出模块
import React from 'react'
import './rowShow.scss'

class RowShow extends React.Component{
    calSaleName(status){
        if(status.displayName==='售票中'){
            return 'sell'
        }else if(status.displayName==='预售中'){
            return 'presell'
        }
        return 'sell'
    }
    render(){   
        const show = this.props.show;
        return (
            <div className="row-show" 
                onClick={()=>{this.props.onClick&&this.props.onClick(show)}}
            > 
                <div className="left-column-wrapper"> 
                    <div className="image-contianer"> 
                        <img src={show.imgUrl} alt={show.showName}/> 
                        {show.discount<10?(
                        <div className="discount"> 
                            <div className="number">{show.discount}</div>{show.text}
                        </div>):null}                        
                    </div>
                </div>
                <div className="right-column-wrapper">
                    <div className="right-column"> 
                        <div className="show-name ">{show.showName}</div> 
                        <div className="show-time ">{show.firstShowTime} - {show.lastShowTime}</div> 
                        <div className="show-avenue ">{show.venueName}</div> 
                        <div className="other-detail"> 
                            <div className="left-part">
                                <div className={"tag "+this.calSaleName(show.showStatus)}>{show.showStatus.displayName}</div>  
                                {show.supportVr?<div className="tag vr ">VR选座</div>:null}
                            </div>
                            <div className="right-part"> 
                                <div className="price ng-scope"> 
                                    <span className="number">{show.minPrice}</span> 元起 
                                </div>
                            </div> 
                        </div> 
                        <div className="show-advertise">
                            {show.advertise}
                        </div>
                    </div> 
                </div> 
            </div>
        )
    }   
}
export default RowShow;