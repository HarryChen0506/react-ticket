// 主页-推荐演出
import React from 'react'
import './recommendShow.scss'
import SectionTitle from 'component/SectionTitle'
import RowShowList from 'component/RowShowList'
import SectionLogo from 'component/SectionLogo'
import httpService from 'http_service/service.js'

class RecommendShow extends React.Component{
    constructor(...args){
        super(...args); 
        this.state = {
            showList: []
        }
    }
    componentDidMount(){
       this.getRecommendShows();
    }
    getRecommendShows(){         
        const params = {
             src: 'weixin',
             siteCityOID: '1001',
             offset: 0,
             length: 10
        }
        // offset=0&length=10&src=weixin&time=1514975389512&siteCityOID=1001
        httpService.main.getRecommendShows(params).then((res)=>{
            const recommendShows = res.data.result.data;
            this.setState({
                showList: this.getRecommendShowList(recommendShows)
            })
        },(err)=>{
            alert(err)
        })
    }
    getRecommendShowList(list){        
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
                    showList={this.state.showList}
                    onClick={(_el)=>{console.log(_el)}}
                /> 
                <SectionLogo title="摩天轮票务"/>     
            </div>
        )
    }   
}
export default RecommendShow;