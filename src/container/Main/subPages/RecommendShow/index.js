// 主页-推荐演出
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './recommendShow.scss'
import SectionTitle from 'component/SectionTitle'
import RowShowList from 'component/RowShowList'
import SectionLogo from 'component/SectionLogo'

@withRouter
@connect(
    state=>state,
    null
)
class RecommendShow extends React.Component{
    getRecommendShowList(list=[]){        
        return list.map((item)=>({
            showName: item.showName,
            showTime: item.firstShowTime,
            showOID: item.showOID,
            discount: (item.discount*10).toFixed(1),
            imgUrl: item.posterURL,
            text: '折起',
            firstShowTime: item.firstShowTime,
            lastShowTime: item.lastShowTime,
            minPrice: item.minPrice,
            advertise: item.advertise,
            venueName: item.venueName,
            showStatus: item.showStatus,
            supportVr: item.supportVr
        }))
    }
    render(){        
         return (
            <div className="recommend-show">                      
                <SectionTitle title="为您推荐" />  
                <RowShowList 
                    showList={this.getRecommendShowList(this.props.show.recommendShow)}
                    onClick={(_el)=>{
                        const showOID = _el.showOID;
                        this.props.history.push('/show/'+showOID)
                    }}
                /> 
                <SectionLogo title="摩天轮票务"/>     
            </div>
        )
    }   
}
export default RecommendShow;